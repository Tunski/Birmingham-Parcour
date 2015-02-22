
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

      var results = null;
      results = [];
      return $q.when(results);

    }

    function searchLocation(location){
      var results = null;
      results = [];

      return $q.when(results);
    }


  }
})();
