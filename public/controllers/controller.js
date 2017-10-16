var myApp = angular.module('myApp', ['ngStorage','ngRoute', 'appRoutes', 'EventDetailsApp', 'authServices', 'EventApp', 'AddEventApp']);


//Service to pass data between controllers
myApp.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptors');
});
  

//AppCtrl controller
myApp.controller('AppCtrl', function(Auth, $scope, $http, $window, $location) {
	
  
  
  if(Auth.isLoggedIn()){
    Auth.getUser().then(function(data){
      console.log(data);
    });
  }else{
    console.log('Failure, user is not logged in.');
  }

  $scope.AddEventPage = function(){
  
    $location.path('/addevent');

  };

   $scope.Register = function(){
  
    $location.path('/register');

  };

  $scope.LoginPage = function(){
  
    $location.path('/login');

  };

  $scope.regUser = function(){
  console.log("registering");
      $scope.regData.usertype = 'User';
      $http.post('/user/register', $scope.regData).then(function(data){
        console.log("registering");
        console.log("data.success = " +  JSON.stringify(data));
        if(data.data.success){
          $window.alert("Account created!");
          $location.path('/home');
        }else{
          $window.alert("Failed to create account");
        }
        
        
      });
    

  };

  $scope.Logout = function(){
    Auth.logout();
    $window.alert('Account Logout!');
    $location.path('/home');
  };

  $scope.Login = function(){
    console.log("login");
    console.log($scope.logData);
    var user = {
      username : $scope.logData.username,
      password : $scope.logData.password,
      
    };
      Auth.login(user).then(function(data){
        console.log("successful login");
        console.log(data.data.username);
        //$rootScope.username = data.data.username;
        //$window.localStorage.setItem('currentUser', data.data.username);
        //console.log('current user = ' + $window.localStorage.getItem('currentUser'));
        if(data.data.success){
          $window.alert("Successful Login!");
          $location.path('/home');
        }else{
          $window.alert("Cannot authenticate user");
        }
        //$scope.logoutbutton = true;
        //$window.alert("Welcome, " + $window.localStorage.getItem('currentUser'));
        //$window.location.href = '#!/home';
        //console.log($scope.logoutbutton);
        
      });

  };

  $scope.AddEvent = function(){
      
    /*$http.post('/eventlist', $scope.event).then(function(response){

      $window.location.href = '/index.html';

    });*/

  };



  $scope.JoinEvent = function(event){
      
    console.log(event);
    $scope.joiningevent = event;
    $scope.joineventvisible = true;  
    $location.path('/userjoinform');
    
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
      $location.path('/home');
  };

});



