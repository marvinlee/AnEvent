angular.module('EventApp', ['ngStorage','ngRoute', 'appRoutes'])

.controller('EventController', function($scope, $http, $window) {
	
	$http.get('/api/event').then(function(response){
		console.log("getting event");
	    console.log(response.data);

	    //You will get the above response here  in response.data
	    $scope.events = response.data;
	     if(!$scope.events.length){
	     	$scope.emptyevent = true;
	     }else{
	     	$scope.emptyevent = false;
	     }

  	});

});