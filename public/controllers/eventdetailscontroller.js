var myApp = angular.module('myApp', ['ngStorage','ngRoute']);
myApp.factory('myService', function() {
   var savedData = {}
   function set(data) {
     savedData = data;
   }
   function get() {
    return savedData;
   }

   return {
    set: set,
    get: get
   }

});

myApp.controller('EventDCtrl', ['$scope',  '$http', '$location', 'myService', function($scope, $http, $location, myService) {
	
  $scope.eventID = $location.search().event_id;
  console.log("event id = " + $location.search().event_id);

  $http.post('/eventdetails', $scope.eventID).then(function(response){
    
    //You will get the above response here  in response.data
    $scope.event = response.data;

  });
	
  
	
}]);

