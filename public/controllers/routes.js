angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider) {
	console.log("calling from routes");
	$routeProvider

	.when('/home', {
      templateUrl: 'views/eventlistview.html',
      controller: 'AppCtrl'
    })
    .when('/eventdetails/:event_id', {
      templateUrl: 'views/eventdetailsview.html',
      controller: 'EventDetailsCtrl'
    })
    .when('/userjoinform/', {
      templateUrl: 'views/userjoinform.html',
      controller: 'AppCtrl'
    })
    .when('/successjoinevent', {
      templateUrl: 'views/successjoinevent.html',
      controller: 'AppCtrl'
    })
    .when('/editevent/:event_id', {
      templateUrl: 'views/editevent.html',
      controller: 'EventDetailsCtrl'
    })
    .when('/register', {
      templateUrl: 'views/userregister.html',
      controller: 'AppCtrl'
    })
    .when('/login', {
      templateUrl: 'views/userlogin.html',
      controller: 'AppCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });

    /*$locationProvider.html5Mode({
    	enable: true,
    	requireBase: false
    });*/
});