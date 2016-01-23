angular.module('app.main', [])

.controller('MainController', function($scope){
  $scope.test = function(){
    console.log('Main/Main controller is working');
  };
  $scope.test();
});