angular.module('AddEventApp', ['ngStorage','ngRoute', 'appRoutes'])

.controller('AddEventController', function($scope, $http, $window, $location) {
	
	console.log('addevent controller')
	$scope.AddEvent = function(){
		$http.post('/api/event/new', $scope.event).then(function(res){
			$window.alert('Event Submitted');
			$location.path('/home');
		});
	};
	

});