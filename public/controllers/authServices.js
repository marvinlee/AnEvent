angular.module('authServices', [])

.factory('Auth', function($http, AuthToken){
	var authFactory = {};

	authFactory.login = function(regData){
		return $http.post('/user/login', regData).then(function(data){
			AuthToken.setToken(data.data.token);
			return data;
		});
	};

	authFactory.isLoggedIn = function(){

		if(AuthToken.checkToken()){
			return true;
		}else{
			return false;
		}
	};

	authFactory.getUser = function(){

		if(AuthToken.getToken()){
			return $http.post('/user/currentUser');
		}else{
			return false;
		}
	};

	authFactory.logout = function(){
		AuthToken.setToken();
	};



	

	return authFactory;

})

.factory('AuthToken', function($window){
	var authTokenFactory = {};


	authTokenFactory.setToken = function(token){
		$window.localStorage.setItem('token', token);
	};


	authTokenFactory.getToken = function(){
		
		return $window.localStorage.getItem('token');
		
	};

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