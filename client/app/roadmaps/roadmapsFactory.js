angular.module('roadmaps.factory', [])

  .factory('RoadMapsFactory', function($http){

    var upvotes;
    var downvotes;
    // I'll need the following ids here if I want the voting function here
    // var roadmapId = $stateParams.roadmapID;
    // need the userId

  //   Server.getRoadmapById = function(id) {

  //   return $http.get('/api/roadmaps/' + id)
  //   .then(standardResponse)
  //   .catch(standardError);
  // };

    var sendUpVote = function(roadmapId, username) {
      //send data boolen in body
      // POST request to database to update roadmap model to include the userId
      return $http.post('/api/roadmaps/' + id)
      .then(standardResponse)
      .catch(standardError)
    }


  //   // update vote count in database
    var sendDownVote = function(roadmapId, username){
      //send data boolen in body
      // POST request to database to update roadmap model to include the userId
      return $http.post('/api/roadmaps/' + id)
      .then(standardResponse)
      .catch(standardError)
    };

    return {
      upvotes : upvotes,
      downvotes : downvotes,
      sendUpVote : sendUpVote,
      sendDownVote : sendDownVote  
    };
   });