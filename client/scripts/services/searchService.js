
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
          lat: 33.508301,
          lng: -86.811972,
          distance:.44
        },
        {
          message: 'Railroad Park 2',
          lat: 33.5098666,
          lng: -86.8096099,
          distance: .24
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
          lat: 33.508301,
          lng: -86.811972,
          distance:.44
        },
        {
          message: 'Railroad Park 2',
          lat: 33.5098666,
          lng: -86.8096099,
          distance: .24
        }
      ];
      var results = null;
      results = locations;

      return $q.when(results);
    }



  }
})();
