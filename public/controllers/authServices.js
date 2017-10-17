//authentication service
angular.module('authServices', [])

.factory('Auth', function($http, AuthToken){
	var authFactory = {};

	//login method
	authFactory.login = function(regData){
		return $http.post('/user/login', regData).then(function(data){
			AuthToken.setToken(data.data.token);
			return data;
		});
	};

	//check is user logged in method
	authFactory.isLoggedIn = function(){

		if(AuthToken.checkToken()){
			return true;
		}else{
			return false;
		}
	};

	//get logged in user information from token
	authFactory.getUser = function(){

		if(AuthToken.getToken()){
			return $http.post('/user/currentUser');
		}else{
			return false;
		}
	};

	//logout method, reset token
	authFactory.logout = function(){
		AuthToken.setToken();
	};

	return authFactory;

})

//Authentication token service
.factory('AuthToken', function($window){
	var authTokenFactory = {};

	//set token method
	authTokenFactory.setToken = function(token){
		$window.localStorage.setItem('token', token);
	};

	//get token method
	authTokenFactory.getToken = function(){
		
		return $window.localStorage.getItem('token');
		
	};

	//check token existed
	authTokenFactory.checkToken = function(){
		var temp = $window.localStorage.getItem('token');

		if(temp == '' || temp == 'undefined' || temp == null){

			return false;
		}else{

			return true;
		}
	}

	return authTokenFactory;
})

//Authentication Interceptors for headers
.factory('AuthInterceptors', function(AuthToken){
	var authInterceptorsFactory = {};

	authInterceptorsFactory.request = function(config){
		var token = AuthToken.getToken();

		if(token){
			config.headers['x-access-token'] = token;
			return config;
		}
	};

	return authInterceptorsFactory;

});