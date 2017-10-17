//Main Controller
var myApp = angular.module('myApp', ['ngStorage','ngRoute', 'appRoutes', 'authServices', 'EventApp','EditEventApp', 'EventDetailsApp', 'AddEventApp', 'AdminApp']);


myApp.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptors');
});
  

//AppCtrl controller
myApp.controller('AppCtrl', function(Auth, $scope, $http, $window, $location, $rootScope) {
	
  //Referesh when user login or logout
  $rootScope.$on('routeChangeStart', function(){
    if(Auth.isLoggedIn()){
      
      $scope.isLoggedIn = true;

      //get user information with token
      Auth.getUser().then(function(data){
         
        if(data.data.success){
          $scope.isLoggedIn = true;
          $scope.username = data.data.username;
          $scope.email = data.data.email;
          
        }else{
          $scope.isLoggedIn = false;
          
        }
      });
    }else{
      //no user logged in
      $scope.isLoggedIn = false;
      $scope.username ='';
      $scope.email = '';
    }

  });

  
  //Check if any user session when visiting the page
  if(Auth.isLoggedIn()){
    Auth.getUser().then(function(data){
      if(data.data.success){
        $scope.isLoggedIn = true;
        $scope.username = data.data.username;
          $scope.email = data.data.email;
        
        if(data.data.usertype == 'Admin'){
          
          $scope.admin = true;
        }else{
          $scope.admin = false;
        }
      }else{
        $scope.isLoggedIn = false;
        
      }
    
    });
  }else{
    $scope.isLoggedIn = false;
    
  }

  //MyAccount button to check if go to admin profile or user profile
  $scope.MyAccount = function(){
  
    if(Auth.isLoggedIn()){
      Auth.getUser().then(function(data){

        if(data.data.usertype == 'Admin'){
          $location.path('/adminprofile');
        }else{
          $location.path('/userprofile');
        }
      });
    }
    

  };

  //register User form submitted
  $scope.regUser = function(){
  
      $scope.regData.usertype = 'User';
      
        //route to register user
        $http.post('/user/register', $scope.regData).then(function(data){
          
          if(data.data.success){

            $window.alert("Account created!");
            $location.path('/home');

          }else{

            $window.alert("Failed to create account");

          }

        });

  };

  //logout button to remove token from localstorage
  $scope.Logout = function(){
    Auth.logout();
    $window.alert('Account Logout!');
    $scope.isLoggedIn = false;
    $location.path('/home');
  };

  //Login function
  $scope.Login = function(){
    
    var user = {

      username : $scope.logData.username,
      password : $scope.logData.password
      
    };

      //Authentication service function from authService
      Auth.login(user).then(function(data){
    
        if(data.data.success){
          
          //check if admin or normal user
          if(data.data.usertype == 'Admin'){

            $scope.isLoggedIn = true;
            $window.alert("Successful Login!");
            $scope.admin = true;
            $location.path('/home');

          }else{

            $scope.isLoggedIn = true;
            $window.alert("Successful Login!");
            $window.history.back();
            $location.path('/home');

          }
          
        }else{

          $window.alert("Cannot authenticate user");

        }
            
      });

  };

});



