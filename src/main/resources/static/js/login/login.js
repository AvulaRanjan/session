/**
 * 
 */
var app = angular.module('myApp', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')
    $stateProvider
        .state('details', {
            url: "/details",
            templateUrl:'views/details.html'
            	
        })
        .state('login', {
            url: "/",
            templateUrl:'views/login.html'
        })
        
    });
app.controller('loginCtrl', function ($state, $scope, $http) {
	$scope.login = function () { 
		var url = './login.action?userName='+$scope.user.userName+'&password='+$scope.user.password;
	    $http.get(url).then(function(response){
        	$scope.resultMessage = response.data;
        	if(response.data == 'Success'){
        	    $state.go('details');
        	}else{
			alert("invalid credientials");
        		$state.go('login');
        	}
           },function (error){
           alert("error");
       }); 
    }
 });
app.controller('detailsCtrl', function ($scope,$http,$state) {
	$scope.getDetails = function () { 
	var url = './getDetails.action';
    $http.get(url).then(function(response){
    	alert(response.data)
    	if(response.data == 'null'){
    		alert("session expired");
    		$state.go('login');
    	}else{
    		$scope.resultMessage = response.data;
    	}
       },function (error){
       alert("error");
   }); 
	}
});
app.controller('myCtrl', function ($scope,$http) {
	
});
