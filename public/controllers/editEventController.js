angular.module('EditEventApp', ['ngStorage','ngRoute', 'appRoutes', 'authServices'])

.controller('EditEventController', function($scope, $http, $window, $routeParams, $location, Auth) {
	
	$scope.event_id = $routeParams.event_id;


  if(Auth.isLoggedIn()){
      Auth.getUser().then(function(data){

        $scope.user_id = data.data.user_id;
        
      });
    }

	$http.get('/api/event/' + $scope.event_id).then(function(response){

    	$scope.selectedevent = response.data;

  	});


  $scope.EditEvent = function(event){

      var event_id = {event_id: $scope.selectedevent._id};
      $http.put('/api/event/update/' + $scope.event_id, $scope.selectedevent).then(function(response){

          
      });

    };


});