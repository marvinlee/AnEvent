var myApp = angular.module('myApp', ['ngStorage','ngRoute', 'appRoutes']);



//Service to pass data between controllers
myApp.factory('myService', function(){

  var myList = [];
  var set = function(newObj){

    myList.push(newObj);

  }

  var get = function(){

      return myList;

  }

  return{

    set: set,
    get: get

  };

});


//AppCtrl controller
myApp.controller('AppCtrl', ['$scope', '$http', '$window', 'myService', '$rootScope', function($scope, $http, $window, myService, $rootScope) {
	
  $http.get('/eventlist').then(function(response){
		
    //You will get the above response here  in response.data
    $scope.events = response.data;

  });
  console.log('username = ' + $window.localStorage.getItem("currentUser"));
  if($window.localStorage.getItem("currentUser") == '' || $window.localStorage.getItem("currentUser") == null){
    $scope.logoutbutton = false;
  }else{
    $scope.logoutbutton = true;
  }

  $scope.AddEventPage = function(){
  
    $window.location.href = '/eventorder.html';

  };

   $scope.Register = function(){
  
    $window.location.href = '#!/register';

  };

  $scope.LoginPage = function(){
  
    $window.location.href = '#!/login';

  };

  $scope.regUser = function(){
  console.log("registering");
    
      $http.post('/register', $scope.regData).then(function(data){
        console.log("registering");
        $window.alert("Account created!");
        $window.location.href = '#!/home';
      });
    

  };

  $scope.Logout = function(){
    console.log("Logout");
    console.log($rootScope.username);
    $rootScope.username = '';
    $window.localStorage.setItem('currentUser', '');
    $window.alert("Logout!");
    console.log("after logout" + $rootScope.username);
    $scope.logoutbutton = false;

     $window.location.href = '#!/home';
  };

  $scope.Login = function(){
    console.log("login");
    console.log($scope.logData);
    var user = {
      username : $scope.logData.username,
      password : $scope.logData.password,
      
    };
      $http.post('/login', user).then(function(data){
        console.log("successful login");
        console.log(data.data.username);
        $rootScope.username = data.data.username;
        $window.localStorage.setItem('currentUser', data.data.username);
        console.log('current user = ' + $window.localStorage.getItem('currentUser'));
        $scope.logoutbutton = true;
        $window.alert("Welcome, " + $window.localStorage.getItem('currentUser'));
        $window.location.href = '#!/home';
        console.log($scope.logoutbutton);
        
      });

  };

  $scope.AddEvent = function(){
      
    $http.post('/eventlist', $scope.event).then(function(response){

      $window.location.href = '/index.html';

    });

  };

  /*$scope.EventDetails = function(event){
    console.log("event id = "+ event._id);
    $window.location.href = '/eventdetails.html?event_id=' + event._id;
    /*$scope.selectedevent = event;
    $scope.myvalue = true;  
    $scope.joineventvisible = false;
    $scope.joineventdone = false;  */
    
  //};

  $scope.JoinEvent = function(event){
      
    console.log(event);
    $scope.joiningevent = event;
    $scope.joineventvisible = true;  
    $window.location.href = '#!/userjoinform';
    
  };

  $scope.UserJoin = function(){

    var userjoiningevent = {
      username : 'test',
      event_id : $scope.joiningevent._id,
      event_name : $scope.joiningevent.name
    };
     
    /*$http.post('/userevent', userjoiningevent).then(function(response){
    
      $scope.joineventvisible = false; 
      $scope.joineventdone = true;  

    });*/
      $window.location.href = '#!/home';
  };

}]);


myApp.controller('EventDetailsCtrl', ['$scope',  '$http', '$location', 'myService', '$routeParams', function($scope, $http, $location, myService, $routeParams) {
  
  var eventdetailsID = {
    
      event_id : $routeParams.event_id,
      
    };
  
  console.log("event id = " + $routeParams.event_id);

  $http.post('/geteventdetail', eventdetailsID).then(function(response){
    
    //You will get the above response here  in response.data
    $scope.selectedevent = response.data;
    console.log(response.data);

  });
  
  $scope.EditEvent = function(){
      
      console.log("selectedevent = " + JSON.stringify($scope.selectedevent));
    $http.post('/editevent', $scope.selectedevent).then(function(response){

      //$window.location.href = '/index.html';
      console.log("updated = " + response.data);


    });

  };
  
}]);

