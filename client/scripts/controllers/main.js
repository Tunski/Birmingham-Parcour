'use strict';

/**
 * @ngdoc function
 * @name birminghamParcourApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the birminghamParcourApp
 */
angular.module('birminghamParcourApp')
  .controller('MainCtrl', function($scope, $rootScope, $geolocation) {
    $scope.markers = {};
    $scope.startTracking = false;
    $scope.myLocation = {
      'lat': 33.512,
      'lng': -86.808,
      'zoom': 20
    };
    $scope.paths = {
      p1: {
        color: '#008000',
        weight: 8,
        latlngs: [],
      }
    };

    $geolocation.watchPosition({
      timeout: 5000,
      maximumAge: 250,
      enableHighAccuracy: true
    });

    $scope.$watch('waiting', function (newValue, oldValue) {
      if (newValue) {
        $scope.paths.p1.latlngs = [];
      }
    });

    $rootScope.$on('$geolocation.position.changed', function(event, e) {
      $scope.myLocation = {
        'lat': e.coords.latitude,
        'lng': e.coords.longitude,
        'zoom': 20
      };

      if ($scope.tracking) {
        $scope.paths.p1.latlngs.push({
          lat: e.coords.latitude,
          lng: e.coords.longitude
        });
      }

      $scope.markers = {
        mainMarker: {
          lat: e.coords.latitude,
          lng: e.coords.longitude,
          focus: true,
          draggable: false,
          icon: {
            type: 'awesomeMarker',
            icon: 'heart',
            markerColor: 'red',
          }
        }
      };
    });

    $scope.waiting = true;
    $scope.tracking = false;
    $scope.paused = false;
    $scope.finished = false;
  });
