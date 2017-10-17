angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider) {
	console.log("calling from routes");
	$routeProvider

	.when('/home', {
      templateUrl: 'views/eventlistview.html',
      controller: 'EventController'
    })
    .when('/eventdetails/:event_id', {
      templateUrl: 'views/eventdetailsview.html',
      controller: 'EventDetailsController'
    })
    .when('/addevent', {
      templateUrl: 'views/addevent.html',
      controller: 'AddEventController'
    })
    .when('/editevent/:event_id', {
      templateUrl: 'views/editevent.html',
      controller: 'EditEventController'
    })
    .when('/register', {
      templateUrl: 'views/userregister.html',
      controller: 'AppCtrl'
    })
    .when('/login', {
      templateUrl: 'views/userlogin.html',
      controller: 'AppCtrl'
    })
    .when('/userprofile', {
      templateUrl: 'views/userprofile.html',
      controller: 'AppCtrl'
    })
    .when('/adminprofile', {
      templateUrl: 'views/adminuseraccount.html',
      controller: 'AdminController'
    })
    .when('/approveevent', {
      templateUrl: 'views/approveevent.html',
      controller: 'AdminController'
    })
    .when('/approveeventdetails/:event_id', {
      templateUrl: 'views/approveeventdetails.html',
      controller: 'AdminEventDetailsController'
    })
    .otherwise({
      redirectTo: '/home'
    });

    /*$locationProvider.html5Mode({
    	enable: true,
    	requireBase: false
    });*/
});