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
		if(AuthToken.getToken()){
			return true;
		}else{
			return false;
		}
	};

	authFactory.getUser = function(){
		if(AuthToken.getToken()){
			return $http.post('/user/currentUser');
		}else{
			$q.reject({message: 'User has no token'});
		}
	};

	authFactory.logout = function(){
		AuthToken.setToken();
	};

	return authFactory;

})

.factory('AuthToken', function($window){
	var authTokenFactory = {};

	//AuthToken.setToken(token);
	authTokenFactory.setToken = function(token){
		$window.localStorage.setItem('token', token);
	}

	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');
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