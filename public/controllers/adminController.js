//Admin Controller 
angular.module('AdminApp', ['ngStorage','ngRoute', 'appRoutes', 'authServices'])

.controller('AdminController', function($scope, $http, $window, $routeParams, $location, Auth) {
	
	$scope.event_id = $routeParams.event_id;

//check if is admin user
if(Auth.isLoggedIn()){

      Auth.getUser().then(function(data){
        $scope.user_id = data.data.user_id;

        if(data.data.usertype == 'Admin'){

          $scope.admin = true;

        }else{
            //redirecting to home is the user is not admin user
            $scope.admin = false;
            $window.alert('Access Denied! Admin Area');
            $location.path('/home');

        }
        
      });
    }else{
        //redirecting user to login
        $location.path('/login');
    }
  

  
  //get event for admin to approve
	$http.get('/admin/event/approve').then(function(response){
		
       $scope.events = response.data;

       if(!$scope.events.length){
          $scope.emptyevent = true;
       }else{
         $scope.emptyevent = false;
       }

  	});

})

//admin event details controller
.controller('AdminEventDetailsController', function($scope, $http, $window, $routeParams, $location, Auth) {

  //get params
  $scope.event_id = $routeParams.event_id;

  //get event details
  $http.get('/api/event/' + $scope.event_id).then(function(response){

      $scope.selectedevent = response.data;

  });

  //approve event button
  $scope.ApproveEvent = function(event){

      var event_id = {event_id: $scope.selectedevent._id};
      $http.put('/admin/approveEvent/' + $scope.selectedevent._id).then(function(response){

        $window.alert('Event approved!');
        $window.history.back();

      });

    };


    //Delete Event function to remove event
    $scope.DeleteEvent = function(event){
      
      var event_id = {event_id: $scope.selectedevent._id};
      $http.delete('/api/event/remove/' + $scope.selectedevent._id).then(function(response){
      
        $window.alert('Event deleted!');
        $window.history.back();

      });

    };

});

  

