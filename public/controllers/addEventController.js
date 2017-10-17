//Add event controller
angular.module('AddEventApp', ['ngStorage','ngRoute', 'appRoutes', 'authServices'])

.controller('AddEventController', function($scope, $http, $window, $location, Auth) {
	
	//required user login to create new event
	if(Auth.isLoggedIn()){

  		Auth.getUser().then(function(data){
  			$scope.user_id = data.data.user_id;

  			
  		});
  	}else{

      	$location.path('/login');
  	}

  	//Event form submitted button
	$scope.AddEvent = function(){
		
		$http.post('/api/event/new', $scope.event).then(function(res){
			$window.alert('Event Submitted');
			$location.path('/home');
		});
	};
	

});