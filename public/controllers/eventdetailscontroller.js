//Event details controller
angular.module('EventDetailsApp', ['ngStorage','ngRoute', 'appRoutes', 'authServices'])

.controller('EventDetailsController', function($scope, $http, $window, $routeParams, $location, Auth) {
	
  //get params from url
	$scope.event_id = $routeParams.event_id;

  //get details event
	$http.get('/api/event/' + $scope.event_id).then(function(response){

    	$scope.selectedevent = response.data;

  });

    

});