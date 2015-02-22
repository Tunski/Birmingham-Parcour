'use strict';

/**
 * @ngdoc function
 * @name birminghamParcourApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the birminghamParcourApp
 */
angular.module('birminghamParcourApp')
  .controller('MainCtrl', function ($scope,$rootScope,$geolocation) {

    $geolocation.getCurrentPosition({
      timeout: 60000
    }).then(function(data){

      //$scope.myLocationData = data;
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

    $scope.markers = {};
    $scope.myLocation = { 'lat': 33.512, 'lng': -86.808, 'zoom': 12 };




    $geolocation.watchPosition({
      timeout: 500,
      maximumAge: 250,
      enableHighAccuracy: true
    });

    $scope.myCoords = $geolocation.position.coords; // this is regularly updated
    $scope.myError = $geolocation.position.error; // this becomes truthy, and has 'code' and 'message' if an error occurs
    //
    //
    $rootScope.$on('$geolocation.position.changed', function(event, e){
      $scope.myCoords = e.coords; // this is regularly updated

      $scope.markers = {
        mainMarker: {

          lat: $scope.myCoords.latitude,
          lng: $scope.myCoords.longitude,
          focus: true,
          draggable: false
        }

      };


      //debugger;
    });
    //
    //$rootScope.$on('someEvent', function(event, e){ /* implementation here */ });
    //$scope.$watch('myCoords', function(newValue, oldValue) {
    //  //brodcastc
    //  console.log(newValue);
    //});


  });
