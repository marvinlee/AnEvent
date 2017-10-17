angular.module('AddEventApp', ['ngStorage','ngRoute', 'appRoutes', 'authServices'])

.controller('AddEventController', function($scope, $http, $window, $location, Auth) {
	

	if(Auth.isLoggedIn()){
  		console.log('User Loggedin');
  		Auth.getUser().then(function(data){
  			$scope.user_id = data.data.user_id;
  			console.log('type = ' + data.data.usertype);
  			
  		});
  	}else{
  		console.log('no user logged in');
      	$location.path('/login');
  	}

	console.log('addevent controller')
	$scope.AddEvent = function(){
		
		$http.post('/api/event/new', $scope.event).then(function(res){
			$window.alert('Event Submitted');
			$location.path('/home');
		});
	};
	

});