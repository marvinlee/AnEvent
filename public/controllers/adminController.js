angular.module('AdminApp', ['ngStorage','ngRoute', 'appRoutes', 'authServices'])

.controller('AdminController', function($scope, $http, $window, $routeParams, $location, Auth) {
	
	$scope.event_id = $routeParams.event_id;

if(Auth.isLoggedIn()){
      console.log('User Loggedin');
      Auth.getUser().then(function(data){
        $scope.user_id = data.data.user_id;
        console.log('type = ' + data.data.usertype);

        if(data.data.usertype == 'Admin'){
          console.log('type = ' + data.data.usertype);
          $scope.admin = true;
        }else{
          $scope.admin = false;
           $window.alert('Access Denied! Admin Area');
           $location.path('/home');
        }
        
      });
    }else{
        
        $location.path('/login');
    }
  

  

	$http.get('/admin/event/approve').then(function(response){
		console.log("getting specific event");
        
       $scope.events = response.data;
        console.log(JSON.stringify($scope.events.event));
       if(!$scope.events.length){
          $scope.emptyevent = true;
       }else{
         $scope.emptyevent = false;
       }

  	});


    $scope.EventDetails = function(event){
      
    };

  	$scope.DeleteEvent = function(event){
  		console.log('event = ' + $scope.selectedevent._id);
  		var event_id = {event_id: $scope.selectedevent._id};
  		$http.delete('/api/event/remove/' + $scope.selectedevent._id).then(function(response){
			//console.log("getting specific event");
	    	//console.log(response.data);
	    	//You will get the above response here  in response.data
	    	//$scope.selectedevent = response.data;
	    	$window.alert('Event deleted!');
	    	$window.history.back();

  		});

  	};

	$scope.ApproveEvent = function(event){
  		console.log('event = ' + $scope.selectedevent._id);
  		var event_id = {event_id: $scope.selectedevent._id};
  		$http.put('/admin/approveEvent/' + $scope.selectedevent._id).then(function(response){
			//console.log("getting specific event");
	    	//console.log(response.data);
	    	//You will get the above response here  in response.data
	    	//$scope.selectedevent = response.data;
	    	$window.alert('Event approved!');
	    	$window.history.back();

  		});

  	};

  	


})
.controller('AdminEventDetailsController', function($scope, $http, $window, $routeParams, $location, Auth) {

  $scope.event_id = $routeParams.event_id;
  console.log('event id = ' + $scope.event_id);

  $http.get('/api/event/' + $scope.event_id).then(function(response){
    console.log("getting specific event");
      console.log(response.data);
      //You will get the above response here  in response.data
      $scope.selectedevent = response.data;

  });

  $scope.ApproveEvent = function(event){
      console.log('event = ' + $scope.selectedevent._id);
      var event_id = {event_id: $scope.selectedevent._id};
      $http.put('/admin/approveEvent/' + $scope.selectedevent._id).then(function(response){
      //console.log("getting specific event");
        //console.log(response.data);
        //You will get the above response here  in response.data
        //$scope.selectedevent = response.data;
        $window.alert('Event approved!');
        $window.history.back();

      });

    };

});

  

