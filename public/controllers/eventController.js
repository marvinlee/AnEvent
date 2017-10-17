angular.module('EventApp', ['ngStorage','ngRoute', 'appRoutes'])

.controller('EventController', function($scope, $http, $window) {
	
	//get all event function
	$http.get('/api/event').then(function(response){

	    $scope.events = response.data;
	     if(!$scope.events.length){
	     	$scope.emptyevent = true;
	     }else{
	     	$scope.emptyevent = false;
	     }

  	});

});