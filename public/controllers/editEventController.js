angular.module('EditEventApp', ['ngStorage','ngRoute', 'appRoutes', 'authServices'])

.controller('EditEventController', function($scope, $http, $window, $routeParams, $location, Auth) {
	
	$scope.event_id = $routeParams.event_id;
	console.log('in edit event controller = ' + $scope.event_id);

  if(Auth.isLoggedIn()){
      Auth.getUser().then(function(data){
        console.log('usertype = ' + data.data.user_id);
        $scope.user_id = data.data.user_id;
        
      });
    }

	$http.get('/api/event/' + $scope.event_id).then(function(response){
		console.log("getting specific event");
    	console.log(response.data);
    	//You will get the above response here  in response.data
    	$scope.selectedevent = response.data;

  	});

  /*$http.put('/api/event/update/setlock/' + $scope.event_id).then(function(response){
          console.log("setting lock " + JSON.stringify(response));

        

      });*/

  


  

  $scope.EditEvent = function(event){
      console.log('event = ' + $scope.selectedevent._id);
      var event_id = {event_id: $scope.selectedevent._id};
      $http.put('/api/event/update/' + $scope.event_id, $scope.selectedevent).then(function(response){
          console.log("update event and lock " + JSON.stringify(response));
          
        

      });


    };


  	
    

	


});