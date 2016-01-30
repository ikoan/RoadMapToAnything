angular.module('app.roadmapsfactory', [])

  .factory('RoadMapsFactory', function($http){
    var roadmapId = localStorage.getItem('roadmap.id') || '000000000000000000000010';
    // var username = localStorage.getItem('user.username') || 'bowieloverx950';
    // var nodeId = currentNode._id;
    var currentRoadMapData = {};
    var renderedNodes = [];

    // Fetch data for the current roadmap from the server.
    var getRoadMap = function() {
       return $http({
          method: 'GET',
          url: '/api/roadmaps/' + roadmapId
        })
        .then(function (res){
          currentRoadMapData = res.data.data;
        }, function(err){
          if (err) return console.log(err);
        });

      };

    // // Submits a node to the user's inProgress.nodes array.  
    // var submitCompletedNode = function() {
    //   console.log('submitCompletedNode');
    //   var username = localStorage.getItem('user.username') || 'bowieloverx950';
    //   var nodeId = $scope.currentNode._id;

    //   $http({
    //     method: 'PUT',
    //     url: '/api/users/' + username,
    //     data: {'inProgress.nodes': nodeId}
    //   })
    //   .then(function (res) {
    //     console.log('Node added to inProgress.nodes:', res.data.data.inProgress.nodes);
    //   });
    // };

    // // Submits a roadmap to the user's completedRoadmaps array.
    // var submitCompletedRoadmap = function() {
    //   console.log('submitCompletedRoadmap');
    //   var username = localStorage.getItem('user.username') || 'bowieloverx950';

    //   $http({
    //     method: 'PUT',
    //     url: '/api/users/' + username,
    //     data: {completedRoadmaps: roadmapId}
    //   })
    //   .then(function (res) {
    //     console.log('Roadmap added to completedRoadmaps:', res.data.data.completedRoadmaps);
    //   });
    // };

    // This is for the roadMap Creation Form
    // var createRoadMap = function(data){
    //  data.author = localStorage.getItem('user.username') || 'testAuthor';
    
    //   return $http({
    //     method: 'POST',
    //     url: '/api/roadmaps',
    //     data: data
    //   }).then(function(response){
    //     localStorage.setItem('roadmap.id', response.data.data._id);
    //   }, function(err){
    //     if (err) return err;
    //   });
    // };

    return {
      roadmapId: roadmapId,
      // username: username,
      // nodeId: nodeId,
      currentRoadMapData: currentRoadMapData,
      renderedNodes: renderedNodes,
      getRoadMap: getRoadMap,
      // submitCompletedNode: submitCompletedNode,
      // submitCompletedRoadmap: submitCompletedRoadmap,
      // createRoadMap: createRoadMap  
    };
   });