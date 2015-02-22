/* jshint latedef: false */

'use strict';

/**
 * @ngdoc function
 * @name birminghamParcourApp.controller:FilterCtrl
 * @description
 * # FilterCtrl
 * Controller of the birminghamParcourApp
 */
angular.module('birminghamParcourApp')
    .controller('FilterCtrl', function ($scope, $location) {

        function showPosition(position) {
            $('#lat').val(position.coords.latitude);
            $('#long').val(position.coords.longitude);
        }

        function getCheckedResults() {
            var checked = [];

            $('.result-checkbox:checked').each(function () {
                checked.push($(this).attr('value'));
            });

            return checked.join(',');
        }

        $scope.showMap = function () {
            var checkedResults = getCheckedResults(),
                allResults = $scope.results.map(function (result) {
                    return result.id;
                });
            $location.path('/admin/clean').search({
                checked: checkedResults,
                results: allResults
            });
        };



        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }

        $scope.showMap = function () {
            var checkedResults = getCheckedResults(),
                allResults = $scope.results.map(function (result) {
                    return result.id;
                });
            $location.path("/admin/clean").search({
                checked: checkedResults,
                results: allResults
            });
        };

        $scope.getResults = function () {
            //will be replaced by api call
            $scope.results = [{
                id: 100,
                name: "Trail 1300"
            }, {
                id: 101,
                name: "Trail 1126"
            }, {
                id: 102,
                name: "Trail 1054"
            }, {
                id: 103,
                name: "Trail 704"
            }, {
                id: 104,
                name: "Trail 698"
            }, {
                id: 105,
                name: "Trail 399"
            }, {
                id: 106,
                name: "Trail 317"
            }, {
                id: 107,
                name: "Trail 256"
            }, {
                id: 108,
                name: "Trail 251"
            }, {
                id: 109,
                name: "Trail 111"
            }];
        };

    });