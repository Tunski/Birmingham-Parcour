'use strict';

/**
 * @ngdoc overview
 * @name birminghamParcourApp
 * @description
 * # birminghamParcourApp
 *
 * Main module of the application.
 */
angular
  .module('birminghamParcourApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'leaflet-directive',
    'ngGeolocation',
    'ui.bootstrap',
    'toaster'
  ])
    .config(function ($routeProvider) {
        $routeProvider
          .when('/', {
              templateUrl: 'views/main.html',
              controller: 'MainCtrl'
          })
          .when('/about', {
              templateUrl: 'views/about.html',
              controller: 'AboutCtrl'
          })
          .when('/admin/filter', {
              templateUrl: 'views/filter.html',
              controller: 'FilterCtrl'
          })
          .when('/admin/clean', {
              templateUrl: 'views/clean.html',
              controller: 'CleanCtrl'
          })
          .when('/checkin', {
            templateUrl: 'views/checkin.html',
            controller: 'checkinCtrl'
          })
          .when('/search', {
            templateUrl: 'views/search.html',
            controller: 'searchCtrl'
          })
          .otherwise({
              redirectTo: '/'
          });
    });

  angular
    .module('birminghamParcourApp')
    .value('defaultMarker', {
      type: 'awesomeMarker',
      icon: 'heart',
      markerColor: 'red',
    });
