angular.module('EventDetailsApp', ['ngStorage','ngRoute', 'appRoutes', 'authServices'])

.controller('EventDetailsController', function($scope, $http, $window, $routeParams, $location, Auth) {
	
	$scope.event_id = $routeParams.event_id;
	console.log('event id = ' + $scope.event_id);

	$http.get('/api/event/' + $scope.event_id).then(function(response){
		console.log("getting specific event");
    	console.log(response.data);
    	//You will get the above response here  in response.data
    	$scope.selectedevent = response.data;

  	});

  

  $scope.EditEvent = function(event){
      console.log('event = ' + $scope.selectedevent._id);
      var event_id = {event_id: $scope.selectedevent._id};
      $http.post('/event/update/getlock/' + $scope.selectedevent._id).then(function(response){
          console.log("getting lock " + JSON.stringify(response));

        

      });

    };


  	$scope.DeleteEvent = function(event){
  		console.log('event = ' + $scope.selectedevent._id);
  		var event_id = {event_id: $scope.selectedevent._id};
  		$http.delete('/api/event/remove/' + $scope.selectedevent._id).then(function(response){
			
	    	$window.alert('Event deleted!');
	    	$window.history.back();

  		});

  	};

    $scope.JoinEvent = function(event){
      console.log('event = ' + $scope.selectedevent._id);
      var event_id = {event_id: $scope.selectedevent._id};
      if(Auth.isLoggedIn()){
      console.log('User Loggedin');
      Auth.getUser().then(function(data){
        $scope.user_id = data.data.user_id;
        $scope.username = data.data.username;
        console.log('type = ' + data.data.usertype);
        
        });
      }else{
        console.log('no user logged in');
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