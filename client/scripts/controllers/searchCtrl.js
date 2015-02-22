/**
 * Created by patricksullivan on 2/21/15.
 */

'use strict';

/**
 * @ngdoc function
 * @name birminghamParcourApp.controller:AboutCtrl
 * @description
 * # searchCtrl
 * Controller of the birminghamParcourApp
 */
angular.module('birminghamParcourApp')
  .controller('searchCtrl', function ($scope,$geolocation) {

    $scope.searchResults = [];

    $scope.searchText = null;

    $scope.markers = {};
    $scope.myLocation = { 'lat': 33.512, 'lng': -86.808, 'zoom': 12 };

    $scope.myCoords = $geolocation.position.coords; // this is regularly updated
    $scope.myError = $geolocation.position.error; // this becomes truthy, and has 'code' and 'message' if an error occurs
    //
    //

    $scope.searchCurrentLocation = function(){

      $scope.searchText = 'Current Location';
      $geolocation.getCurrentPosition({
        timeout: 60000
      }).then(function(data){

        $scope.myLocation = {
          lat: data.coords.latitude,
          lng: data.coords.longitude,
          zoom: 12
        };

        $scope.markers = {
          mainMarker: {

            lat: data.coords.latitude,
            lng: data.coords.longitude,
            focus: true,
            draggable: false
          }

        };
      });

    };

    $scope.selectItem = function(){

    };

  });
