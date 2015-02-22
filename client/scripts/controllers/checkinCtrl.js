/**
 * Created by patricksullivan on 2/21/15.
 */
'use strict';

/**
 * @ngdoc function
 * @name birminghamParcourApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the birminghamParcourApp
 */
angular.module('birminghamParcourApp')
  .controller('checkinCtrl', function ($scope,$modal,$log,$location,toaster) {

    $scope.title = 'Check In';

    $scope.nearbyList =  [
      {
        message: 'Railroad Park',
        lat: 33.533,
        lng: -86.8086459,
        distance: 2.5
      },
      {
        message: 'Railroad Park 2',
        lat: 33.522,
        lng: -86.8086459,
        distance: 1.33
      }
    ];

    $scope.checkIn = function(item){

      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: '',
        resolve: {
          items: function () {
            return $scope.nearbyList;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $location.path('#/');
        toaster.pop('success', "Check In", "You have been checked in.");
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    }

  });


angular.module('birminghamParcourApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.trailStatus = 1;
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
