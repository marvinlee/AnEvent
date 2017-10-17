
var myApp = angular.module('myApp', ['ngStorage','ngRoute', 'appRoutes', 'authServices', 'EventApp','EditEventApp', 'EventDetailsApp', 'AddEventApp', 'AdminApp']);

var myApp = angular.module('myApp', ['ngStorage','ngRoute', 'appRoutes', 'EventDetailsApp', 'authServices', 'EventApp','EditEventApp', 'AddEventApp', 'AdminApp']);



//Service to pass data between controllers
myApp.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptors');
});
  

//AppCtrl controller
myApp.controller('AppCtrl', function(Auth, $scope, $http, $window, $location, $rootScope) {
	
  $rootScope.$on('routeChangeStart', function(){
    if(Auth.isLoggedIn()){
      console.log('Success: user is logged in');
      $scope.isLoggedIn = true;
      Auth.getUser().then(function(data){
        console.log(data.data.username);  
        
        if(data.data.success){
          $scope.isLoggedIn = true;
          $scope.username = data.data.username;
          $scope.email = data.data.email;
          console.log(data);
        }else{
          $scope.isLoggedIn = false;
          console.log(data);
        }
      });
    }else{
      console.log('Failure : User is not logged in');
      $scope.isLoggedIn = false;
      $scope.username ='';
      $scope.email = '';
    }

  });

  
  
  if(Auth.isLoggedIn()){
    Auth.getUser().then(function(data){
      if(data.data.success){
        $scope.isLoggedIn = true;
        $scope.username = data.data.username;
          $scope.email = data.data.email;
        console.log(data);
        if(data.data.usertype == 'Admin'){
          console.log('type = ' + data.data.usertype);
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
    console.log('Failure, user is not logged in.');
  }


  $scope.MyAccount = function(){
  console.log('usertype = ' + Auth.isLoggedIn());
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

  

   

  $scope.regUser = function(){
  
      $scope.regData.usertype = 'User';
      
        $http.post('/user/register', $scope.regData).then(function(data){
          
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
    $scope.isLoggedIn = false;
    $location.path('/home');
  };

  $scope.Login = function(){
    
    var user = {

      username : $scope.logData.username,
      password : $scope.logData.password
      
    };

      Auth.login(user).then(function(data){
    
        if(data.data.success){
          
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



