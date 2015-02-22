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

            return checked.join(",");
        }

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
            $scope.results = [
                {
                    name: "Trail 1",
                    id: 100
                }, {
                    name: "Trail 2",
                    id: 101
                }, {
                    name: "Trail 3",
                    id: 102
                }, {
                    name: "Trail 4",
                    id: 103
                }, {
                    name: "Trail 5",
                    id: 104
                }, {
                    name: "Trail 6",
                    id: 105
                }, {
                    name: "Trail 7",
                    id: 106
                }, {
                    name: "Trail 8",
                    id: 107
                }, {
                    name: "Trail 9",
                    id: 108
                }, {
                    name: "Trail 10",
                    id: 109
                }];
        };

    });