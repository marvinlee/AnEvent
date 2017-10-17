angular.module('EventApp', ['ngStorage','ngRoute', 'appRoutes'])

.controller('EventController', function($scope, $http, $window) {
	
	$http.get('/api/event').then(function(response){

	    $scope.events = response.data;
	     if(!$scope.events.length){
	     	$scope.emptyevent = true;
	     }else{
	     	$scope.emptyevent = false;
	     }

  	});

});