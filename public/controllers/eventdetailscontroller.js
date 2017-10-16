angular.module('EventDetailsApp', ['ngStorage','ngRoute', 'appRoutes'])

.controller('EventDetailsController', function($scope, $http, $window, $routeParams, $location) {
	
	$scope.event_id = $routeParams.event_id;
	console.log('event id = ' + $scope.event_id);

	$http.get('/api/event/' + $scope.event_id).then(function(response){
		console.log("getting specific event");
    	console.log(response.data);
    	//You will get the above response here  in response.data
    	$scope.selectedevent = response.data;

  	});

  	$scope.DeleteEvent = function(event){
  		console.log('event = ' + $scope.selectedevent._id);
  		var event_id = {event_id: $scope.selectedevent._id};
  		$http.delete('/api/event/remove/' + $scope.selectedevent._id).then(function(response){
			//console.log("getting specific event");
	    	//console.log(response.data);
	    	//You will get the above response here  in response.data
	    	//$scope.selectedevent = response.data;
	    	$window.alert('Event deleted!');
	    	$location.path('/home');

  		});

  	};


});