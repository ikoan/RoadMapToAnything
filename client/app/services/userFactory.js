angular.module('services.user', ['services.request'])

.factory('User', ['Request', function (Request) {

  var User = {};

  /* * * * * * * * * * * * * * * * * * * * * 
   *           HELPER FUNCTIONS            *
   * * * * * * * * * * * * * * * * * * * * */

  // Standard response after for auth actions
  var authResponse = function (data, message) {
    console.log('DATA', data);
    console.log(data.username, message);
    localStorage.setItem('user.username', data.username);
    localStorage.setItem('user.authToken', data.authToken);
    return data;
  };

  // Calculates user's progress toward completing one or many roadmaps
  var calcProgress = function(inProgress, id) {
    var maps = inProgress.roadmaps;
    var nodes = inProgress.nodes;
    var nodeCounts = {};
    var results = [];

    // If looking at one roadmap, narrow maps array to that
    if (id) {
      for (var i = 0; i < maps.length; i++) {
        if (maps[i]._id === id) maps = [maps[i]];
      }
    }

    nodes.forEach(function (node) {
      nodeCounts[node.parentRoadmap] = nodeCounts[node.parentRoadmap] + 1 || 1;
    });

    maps.forEach(function (map) {
      var completed = nodeCounts[map._id] || 0;
      var total = map.nodes.length;

      results.push({
        _id: map._id,
        completed: completed,
        total: total,
        percent: Math.floor(completed / total * 100)
      });
    });

    // If looking at one roadmap, return just that result, otherwise an array
    return id ? results[0] : results;
  };


  /* * * * * * * * * * * * * * * * * * * * * 
   *                BASIC                  *
   * * * * * * * * * * * * * * * * * * * * */

  User.getData = function() {
    return Request.get('/api/users/' + localStorage.getItem('user.username'));
  };


  /* * * * * * * * * * * * * * * * * * * * * 
   *                 AUTH                  *
   * * * * * * * * * * * * * * * * * * * * */

  User.login = function(name, pass) {
    var credentials = {username: name, password: pass};

    return Request.get('/api/login', credentials, {auth: false, log: false})
    .then(function (data) {
      return authResponse(data, 'successfully logged in.');
    });
  };

  User.signup = function(user) {
    return Request.post('/api/signup', user, {auth: false, log: false})
    .then(function (data) {
      return authResponse(data, 'successfully signed up.');
    });
  };

  User.logout = function() {
    var username = localStorage.getItem('user.username');
    localStorage.removeItem('user.username');
    localStorage.removeItem('user.authToken');
    console.log(username, 'successfully logged out.');
  };

  User.isLoggedIn = function() {
    return !!localStorage.getItem('user.authToken');
  };


  /* * * * * * * * * * * * * * * * * * * * * 
   *               PROGRESS                *
   * * * * * * * * * * * * * * * * * * * * */

  User.followRoadmapById = function(id) {
    return Request.put('/api/roadmaps/' + id + '/follow');
  };

  User.unfollowRoadmapById = function(id) {
    return Request.put('/api/roadmaps/' + id + '/unfollow');
  };

  User.completeNodeById = function(id) {
    return Request.put('/api/nodes/' + id + '/complete');
  };

  User.completeRoadmapById = function(id) {
    return Request.put('/api/roadmaps/' + id + '/complete');
  };

  // Accepts one or two possible parameters:
  //  id: returns progress for a single roadmap, otherwise returns all
  //  user: passing a user object allows serverless synchronus functionality
  User.getRoadmapProgress = function() {
    var id, user;
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] === 'string') id = arguments[i];
      if (typeof arguments[i] === 'object') user = arguments[i];
    }

    // If no user provided, user is fetched, and a promise is returned
    if (!user) {
      return User.getData()
      .then(function (user) {
        return calcProgress(user.inProgress, id);
      });

    } else {
      return calcProgress(user.inProgress, id);
    }
  };


   /* Request.put = function(url, data, options) {
    parseOptionals(data, options);

    return Request({
      method: 'PUT', 
      url: url, 
      data: data, 
      options: mergeDefaults(options)
    });
  }; */

  /*
    var sendUpVote = function(id, username) {
      // Post request to database to update roadmap model to add username in upvotes array
      return $http.post('/api/roadmaps/' + id + '/upvote', {username: username})
    }
  */

  User.upvoteRoadmapById = function(id, username) {
    return Request.put('/api/roadmaps/' + id + '/upvote', {username: username});
  }


  /* * * * * * * * * * * * * * * * * * * * * 
   *               ALIASES                 *
   * * * * * * * * * * * * * * * * * * * * */

  User.followMapById = User.followRoadmapById;
  User.followRoadmap = User.followRoadmapById;
  User.followMap = User.followRoadmapById;
  User.follow = User.followRoadmapById;
  User.unfollowMapById = User.unfollowRoadmapById;
  User.unfollowRoadmap = User.unfollowRoadmapById;
  User.unfollowMap = User.unfollowRoadmapById;
  User.unfollow = User.unfollowRoadmapById;

  User.completeNode = User.completeNodeById;
  User.completeMapById = User.completeRoadmapById;
  User.completeRoadmap = User.completeRoadmapById;
  User.completeMap = User.completeRoadmapById;

  User.getMapProgress = User.getRoadmapProgress;
  User.getProgress = User.getRoadmapProgress;

  User.upvoteRoadmapById = User.upvoteRoadmapById;

  return User;

}]);
