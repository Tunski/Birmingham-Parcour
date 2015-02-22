
(function () {
  'use strict';

  var serviceId = 'searchService';

  angular.module('birminghamParcourApp').factory(serviceId, ['$http','$q', searchService]);

  function searchService($http,$q) {


    var service = {
      searchText: searchText,
      searchLocation: searchLocation

    };

    return service;


    function searchText(text) {
      var locations = [
        {
          message: 'Railroad Park',
          lat: 33.533,
          lng: -86.8086459
        },
        {
          message: 'Railroad Park 2',
          lat: 33.522,
          lng: -86.8086459
        }
      ];
      var results = null;
      results = locations;
      return $q.when(results);

    }

    function searchLocation(location){
      var locations = [
        {
          message: 'Railroad Park',
          lat: 33.533,
          lng: -86.8086459
        },
        {
          message: 'Railroad Park 2',
          lat: 33.522,
          lng: -86.8086459
        }
      ];
      var results = null;
      results = locations;

      return $q.when(results);
    }



  }
})();
