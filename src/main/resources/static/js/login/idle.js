/**
 * 
 */
angular.module('demo', ['ngIdle','ui.bootstrap'])
    .controller('DemoCtrl', function($uibModal, $scope, Idle, Keepalive){
      $scope.started = false;
          function closeModals() {
        if ($scope.warning) {
          $scope.warning.close();
          $scope.warning = null;
        }
        if ($scope.timedout) {
          $scope.timedout.close();
          $scope.timedout = null;
        }
      }
      $scope.$on('IdleStart', function() {
    	  console.log("idle Start");
        closeModals();
        $scope.warning = $uibModal.open({
          templateUrl: 'warning-dialog.html',
          windowClass: 'modal-danger',
          controller :  'modalCtrl'
        });
      });

//      $scope.$on('IdleEnd', function() {
//        closeModals();
//      });

      $scope.$on('IdleTimeout', function() {
    	  console.log("idletimeout");
        closeModals();
        $scope.timedout = $uibModal.open({
          templateUrl: 'timedout-dialog.html',
          windowClass: 'modal-danger'
         	  
        });
      });

      $scope.start = function() {
    	  console.log("starting demo");
        closeModals();
        Idle.watch();
        $scope.started = true;
      };

      $scope.stop = function() {
    	  console.log("stopping demo");
        closeModals();
        Idle.unwatch();
        $scope.started = false;

      };
    })
    .controller('modalCtrl', function( $uibModalInstance, $scope) {
    	console.log("In modal ctrl");
	$scope.closeModals = function() {
		alert("closing");
		
	  $uibModalInstance.close();
	};
} )
    .config(function(IdleProvider, KeepaliveProvider) {
      IdleProvider.idle(20);
      IdleProvider.timeout(5);
      KeepaliveProvider.interval(5);
    }
//assume myApp was defined according to the "Configure" example above
//.run(['Idle', function(Idle) {
//  Idle.watch();
//}])
);
      
