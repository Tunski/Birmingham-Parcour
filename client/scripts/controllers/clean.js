'use strict';

/**
 * @ngdoc function
 * @name birminghamParcourApp.controller:CleanCtrl
 * @description
 * # CleanCtrl
 * Controller of the birminghamParcourApp
 */
angular.module('birminghamParcourApp')
    .controller('CleanCtrl',
        function ($scope, $routeParams, leafletData) {

            var allResults = JSON.parse('[' + $routeParams.results + ']'),
                layers = {},
                layerGroup = L.featureGroup([]),
                plottingMode = false,
                maxIndex = -1,
                onMapClick,
                pathStart,
                customLayer;

            $scope.checked = JSON.parse('[' + $routeParams.checked + ']');


            function createOnMapClick(map) {

                return function (e) {
                    if (customLayer.getLatLngs().length === 0) {
                        pathStart = L.marker(e.latlng).addTo(map);
                        pathStart.addTo(map);
                    }

                    customLayer.addLatLng(e.latlng);
                    customLayer.redraw();
                };
            }

            function createPath(points) {
                return {
                    "type": "LineString",
                    "coordinates": points || []
                };
            }

            function highlightFeature(e) {
                var layer = e.target;

                layer.setStyle({
                    weight: 7,
                    opacity: 0.8
                });

                if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                }
            }

            function createMouseOutFunction(layer) {
                return function (e) {
                    layer.setStyle({
                        weight: 5,
                        opacity: 0.5
                    });
                };
            }

            function createStyle(color, map) {
                return {
                    style: {
                        "color": color,
                        "weight": 5,
                        "opacity": 0.5
                    },
                    onEachFeature: function (feature, layer) {
                        layer.on({
                            mouseover: highlightFeature,
                            mouseout: createMouseOutFunction(layer),
                            click: function () {
                                map.fitBounds(layer.getBounds());
                            }
                        });
                    }
                };
            }

            leafletData.getMap().then(function (map) {
                onMapClick = createOnMapClick(map);
                $scope.results.forEach(function (result) {

                    layers[result.id] = L.geoJson(createPath(result.path), createStyle('red', map));

                    if ($scope.checked.indexOf(result.id) !== -1) {

                        layers[result.id].addTo(map);
                        layerGroup.addLayer(layers[result.id]);
                    }
                    if (result.id > maxIndex) {
                        maxIndex = result.id;
                    }
                });
                maxIndex++;
                map.fitBounds(layerGroup.getBounds());
            });

            $scope.itemClicked = function (event, id) {

                leafletData.getMap().then(function (map) {
                    var el = $(event.currentTarget),
                        layer = layers[id];

                    if (el.hasClass("selected")) {
                        layerGroup.removeLayer(layers[id]);
                        if (layerGroup.getLayers().length) {
                            map.fitBounds(layerGroup.getBounds());
                        }
                        el.removeClass("selected");
                        map.removeLayer(layer);
                    } else {
                        layerGroup.addLayer(layers[id]);
                        map.fitBounds(layerGroup.getBounds());
                        el.addClass("selected");
                        layer.addTo(map);
                    }
                });
            };

            $scope.enablePlotting = function () {
                leafletData.getMap().then(function (map) {
                    if (!plottingMode) {
                        customLayer = L.polyline([], {
                            color: 'black'
                        }).addTo(map);
                        map.dragging.disable();
                        map.on('click', onMapClick);
                        $('#addBtn').removeClass('btn-primary').addClass('btn-warning').text('Finish Trail');
                        plottingMode = true;
                    } else {
                        map.dragging.enable();
                        map.off('click', onMapClick);
                        map.removeLayer(pathStart);
                        $('#addBtn').addClass('btn-primary').removeClass('btn-warning').text('Add New');
                        plottingMode = false;
                        var points = customLayer._latlngs.map(function (coord) {
                            return [coord.lng, coord.lat];
                        });
                        layers[maxIndex] = L.geoJson(createPath(points), createStyle('red', map));
                        map.removeLayer(customLayer);
                        $scope.results.push({
                            name: "New Trail",
                            id: maxIndex,
                            path: points
                        });
                        layerGroup.addLayer(layers[maxIndex]);
                        map.fitBounds(layerGroup.getBounds());
                        //el.addClass("selected");
                        layers[maxIndex].addTo(map);
                        maxIndex++;
                    }
                });
            };

            function getResults(checked) {
                //will be replaced by api call
                return [
                    {
                        name: "Trail 1",
                        id: 100,
                        path: [[-86.527837514877320, 34.740360587465350], [-86.527923345565800, 34.739611194824840], [-86.528009176254270, 34.739478948359170], [-86.528170108795160, 34.739373151034230], [-86.528416872024530, 34.739302619409020], [-86.528803110122680, 34.739302619409020], [-86.528931856155400, 34.739249720650570], [-86.528953313827510, 34.738244637805690], [-86.529103517532350, 34.738121205736210], [-86.529350280761720, 34.738130022318730], [-86.529318094253540, 34.736851608033990], [-86.529361009597780, 34.738165288639360], [-86.529092788696290, 34.738156472060590], [-86.528964042663570, 34.738376886246950], [-86.528931856155400, 34.739258537112680], [-86.528255939483640, 34.739311435865450], [-86.527955532073970, 34.739549479833870], [-86.527816057205200, 34.740096096721300], [-86.527869701385500, 34.740351771120864]]
                    }, {
                        name: "Trail 2",
                        id: 101,
                        path: [[-86.5278, 34.7403], [-86.5279, 34.7396], [-86.5280, 34.7394], [-86.5281, 34.7393], [-86.5284, 34.7393], [-86.5288, 34.7393], [-86.5289, 34.7392], [-86.5289, 34.7382], [-86.5291, 34.7381], [-86.5293, 34.7381], [-86.5293, 34.7368], [-86.5293, 34.7381], [-86.5290, 34.7381], [-86.5289, 34.7383], [-86.5289, 34.7392], [-86.5282, 34.7393], [-86.5279, 34.7395], [-86.5278, 34.7400], [-86.5278, 34.7403]]
                    }, {
                        name: "Trail 3",
                        id: 102,
                        path: [[-86.527, 34.740], [-86.527, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.738], [-86.529, 34.738], [-86.529, 34.738], [-86.529, 34.736], [-86.529, 34.738], [-86.529, 34.738], [-86.528, 34.738], [-86.528, 34.739], [-86.528, 34.739], [-86.527, 34.739], [-86.527, 34.740], [-86.527, 34.740]]
                    }, {
                        name: "Trail 4",
                        id: 103,
                        path: [[-86.527, 34.740], [-86.527, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.738], [-86.529, 34.738], [-86.529, 34.738], [-86.529, 34.736], [-86.529, 34.738], [-86.529, 34.738], [-86.528, 34.738], [-86.528, 34.739], [-86.528, 34.739], [-86.527, 34.739], [-86.527, 34.740], [-86.527, 34.740]]
                    }, {
                        name: "Trail 5",
                        id: 104,
                        path: [[-86.527, 34.740], [-86.527, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.738], [-86.529, 34.738], [-86.529, 34.738], [-86.529, 34.736], [-86.529, 34.738], [-86.529, 34.738], [-86.528, 34.738], [-86.528, 34.739], [-86.528, 34.739], [-86.527, 34.739], [-86.527, 34.740], [-86.527, 34.740]]
                    }, {
                        name: "Trail 6",
                        id: 105,
                        path: [[-86.527, 34.740], [-86.527, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.738], [-86.529, 34.738], [-86.529, 34.738], [-86.529, 34.736], [-86.529, 34.738], [-86.529, 34.738], [-86.528, 34.738], [-86.528, 34.739], [-86.528, 34.739], [-86.527, 34.739], [-86.527, 34.740], [-86.527, 34.740]]
                    }, {
                        name: "Trail 7",
                        id: 106,
                        path: [[-86.527, 34.740], [-86.527, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.738], [-86.529, 34.738], [-86.529, 34.738], [-86.529, 34.736], [-86.529, 34.738], [-86.529, 34.738], [-86.528, 34.738], [-86.528, 34.739], [-86.528, 34.739], [-86.527, 34.739], [-86.527, 34.740], [-86.527, 34.740]]
                    }, {
                        name: "Trail 8",
                        id: 107,
                        path: [[-86.527, 34.740], [-86.527, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.738], [-86.529, 34.738], [-86.529, 34.738], [-86.529, 34.736], [-86.529, 34.738], [-86.529, 34.738], [-86.528, 34.738], [-86.528, 34.739], [-86.528, 34.739], [-86.527, 34.739], [-86.527, 34.740], [-86.527, 34.740]]
                    }, {
                        name: "Trail 9",
                        id: 108,
                        path: [[-86.527, 34.740], [-86.527, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.738], [-86.529, 34.738], [-86.529, 34.738], [-86.529, 34.736], [-86.529, 34.738], [-86.529, 34.738], [-86.528, 34.738], [-86.528, 34.739], [-86.528, 34.739], [-86.527, 34.739], [-86.527, 34.740], [-86.527, 34.740]]
                    }, {
                        name: "Trail 10",
                        id: 109,
                        path: [[-86.527, 34.740], [-86.527, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.739], [-86.528, 34.738], [-86.529, 34.738], [-86.529, 34.738], [-86.529, 34.736], [-86.529, 34.738], [-86.529, 34.738], [-86.528, 34.738], [-86.528, 34.739], [-86.528, 34.739], [-86.527, 34.739], [-86.527, 34.740], [-86.527, 34.740]]
                    }];
            }

            $scope.results = getResults(allResults);
        });