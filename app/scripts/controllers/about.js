'use strict';

/**
 * @ngdoc function
 * @name travelRepublicApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the travelRepublicApp
 */
angular.module( 'travelRepublicApp' )
    .controller( 'AboutCtrl', function( $scope, $log ) {
        $scope.logPrice = function( price ) {
            $log.info( price );
        };

        $scope.price = 38;
    } );
