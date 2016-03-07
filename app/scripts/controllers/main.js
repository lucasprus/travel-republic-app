'use strict';

/**
 * @ngdoc function
 * @name travelRepublicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the travelRepublicApp
 */
angular.module( 'travelRepublicApp' )
    .controller( 'MainCtrl', function( $scope, $state, $q, $log ) {
        $scope.filters = {
            name: '',
            starsFrom: 1,
            starsTo: 5,
            userRatingFrom: 'Unrated',
            userRatingTo: 'Spectacular'
        };

        var userRatings = [ 'Unrated', 'Very Poor', 'Poor', 'Unsatisfactory', 'Below Average', 'Average',
            'Above Average', 'Good', 'Very Good', 'Great', 'Excellent', 'Magnificent', 'Exceptional', 'Spectacular' ];
        $scope.userRatings = userRatings;

        $scope.stars = [ 1, 2, 3, 4, 5 ];

        $scope.orderBy = null;
        $scope.order = null;

        $scope.toggleOrder = function( orderBy, order ) {
            if ( $scope.orderBy === orderBy && $scope.order === order ) {
                $scope.orderBy = null;
            } else {
                $scope.orderBy = orderBy;
                $scope.order = order;
            }

            $scope.deferred = $q.defer();
            $state.go( 'index.table', { page: 1 }, { reload: 'index.table' } );
        };

        $scope.deferred = $q.defer();

        $scope.$watchCollection( 'filters', function( newValue, oldValue ) {
            if ( newValue === oldValue ) {
                return;
            }
            $log.log( newValue, oldValue );

            $scope.deferred.resolve( 'New request' );
            $scope.deferred = $q.defer();
            $state.go( 'index.table', { page: 1 }, { reload: 'index.table' } );
        } );

        $scope.updateStarsTo = function() {
            var starsFrom = $scope.filters.starsFrom;
            var starsTo = $scope.filters.starsTo;

            if ( starsFrom > starsTo ) {
                $scope.filters.starsTo = starsFrom;
            }
        };

        $scope.updateStarsFrom = function() {
            var starsFrom = $scope.filters.starsFrom;
            var starsTo = $scope.filters.starsTo;

            if ( starsFrom > starsTo ) {
                $scope.filters.starsFrom = starsTo;
            }
        };

        $scope.updateUserRatingTo = function() {
            var userRatingFrom = $scope.filters.userRatingFrom;
            var userRatingTo = $scope.filters.userRatingTo;

            if ( userRatings.indexOf( userRatingFrom ) > userRatings.indexOf( userRatingTo ) ) {
                $scope.filters.userRatingTo = userRatingFrom;
            }
        };

        $scope.updateUserRatingFrom = function() {
            var userRatingFrom = $scope.filters.userRatingFrom;
            var userRatingTo = $scope.filters.userRatingTo;

            if ( userRatings.indexOf( userRatingFrom ) > userRatings.indexOf( userRatingTo ) ) {
                $scope.filters.userRatingFrom = userRatingTo;
            }
        };
    } );
