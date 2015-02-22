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
  .controller('searchCtrl', function ($scope,$geolocation,$timeout,searchService) {

    $scope.searchListResults = [];
    $scope.searchText = null;
    $scope.markers = {};
    $scope.selectedTabName = 'map';
    $scope.myLocation = { 'lat': 33.512, 'lng': -86.808, 'zoom': 12 };
    $scope.myCoords = $geolocation.position.coords; // this is regularly updated
    $scope.myError = $geolocation.position.error; // this becomes truthy, and has 'code' and 'message' if an error occurs

    $scope.searchTitle = "Trails Near";

    // This is what you will bind the filter to
    $scope.filterText = '';

    // Instantiate these variables outside the watch
    var tempFilterText = '',
      filterTextTimeout;

    $scope.searchCurrentLocation = function(){
      console.log('searchCurrentLocation');
      $scope.searchText = 'Current Location';

      $geolocation.getCurrentPosition({
        timeout: 60000
      }).then(function(data){

        console.log('current location:',data.coords);
        $scope.myLocation = {
          lat: data.coords.latitude,
          lng: data.coords.longitude,
          zoom: 12,
          message: 'Your Location'
        };

        searchService.searchLocation($scope.myLocation)
          .then(function(results){
            console.log('my location search results', results);
            $scope.results = results;
            loadResultsOnScreen($scope.results);
          });

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

    $scope.selectItem = function(item){
        console.log('item selected', item);
    }


    $scope.$watch('searchText', function (val) {
      if (filterTextTimeout) $timeout.cancel(filterTextTimeout);

      tempFilterText = val;
      filterTextTimeout = $timeout(function() {
        $scope.filterText = tempFilterText;
        searchForLocations();
      }, 1000);
    })

    var searchForLocations = function(){
      //find locations near either the current location or the searched location
      console.log('tab', $scope.tabset);
      if($scope.filterText && $scope.filterText == "Current Location"){ //not the best way to do this but...
        //search by current location
        $scope.searchCurrentLocation();
      } else {
        //search by user searched stuff
        console.log('search text', $scope.filterText);
        searchService.searchText($scope.filterText)
          .then(function(results){
            console.log('search results', results);
            $scope.results = results;
            loadResultsOnScreen($scope.results);
          });
      }

    }

    var loadResultsOnScreen = function(results){

      $scope.searchListResults = results;


      console.log('asdfasfda');

      $scope.markers = results;

      $scope.markers.push($scope.myLocation);
    }

    $scope.selectTab = function(selectTab) {
      $scope.selectedTabName = selectTab;
    }



    //init the controller with the current location
    $scope.searchCurrentLocation();

  });
