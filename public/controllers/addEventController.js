angular.module('AddEventApp', ['ngStorage','ngRoute', 'appRoutes', 'authServices'])

.controller('AddEventController', function($scope, $http, $window, $location, Auth) {
	

	if(Auth.isLoggedIn()){

  		Auth.getUser().then(function(data){
  			$scope.user_id = data.data.user_id;

  			
  		});
  	}else{

      	$location.path('/login');
  	}

	$scope.AddEvent = function(){
		
		$http.post('/api/event/new', $scope.event).then(function(res){
			$window.alert('Event Submitted');
			$location.path('/home');
		});
	};
	

});