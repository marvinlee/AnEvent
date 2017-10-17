angular.module('EventDetailsApp', ['ngStorage','ngRoute', 'appRoutes', 'authServices'])

.controller('EventDetailsController', function($scope, $http, $window, $routeParams, $location, Auth) {
	
	$scope.event_id = $routeParams.event_id;

	$http.get('/api/event/' + $scope.event_id).then(function(response){

    	$scope.selectedevent = response.data;

  	});

  

  $scope.EditEvent = function(event){

      var event_id = {event_id: $scope.selectedevent._id};
      $http.post('/event/update/getlock/' + $scope.selectedevent._id).then(function(response){


      });

    };


  	$scope.DeleteEvent = function(event){

  		var event_id = {event_id: $scope.selectedevent._id};
  		$http.delete('/api/event/remove/' + $scope.selectedevent._id).then(function(response){
			
	    	$window.alert('Event deleted!');
	    	$window.history.back();

  		});

  	};

    $scope.JoinEvent = function(event){

      var event_id = {event_id: $scope.selectedevent._id};
      if(Auth.isLoggedIn()){

      Auth.getUser().then(function(data){
        $scope.user_id = data.data.user_id;
        $scope.username = data.data.username;
      
        });
      }else{

        $location.path('/login');
      }
      var userEvent = {
        username: $scope.username,
        user_id: $scope.user_id,
        event_id: $scope.selectedevent._id
      }
      $http.post('/user/joinevent', userEvent).then(function(response){
      
        $window.alert('Event joined!');
        
      });

    };


});