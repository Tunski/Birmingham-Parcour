
(function () {
  'use strict';

  var serviceId = 'searchService';

  angular.module('birminghamParcourApp').factory(serviceId, ['$http','$q', searchService]);

  function searchService($http,$q) {


    var service = {
      search: search

    };

    return service;

    function search(text) {

      var results = null;

      var results = [];
      return $q.when(settings);
    }


  }
})();
