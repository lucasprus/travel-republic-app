'use strict';

/**
 * @ngdoc function
 * @name travelRepublicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the travelRepublicApp
 */
angular.module( 'travelRepublicApp' )
    .controller( 'MainCtrl', function( $scope ) {
        $scope.filters = {
            name: '',
            starsFrom: 1,
            starsTo: 5,
            userRatingFrom: 'Unrated',
            userRatingTo: 'Spectacular',
            orderBy: null,
            order: null
        };

        var userRatings = [ 'Unrated', 'Very Poor', 'Poor', 'Unsatisfactory', 'Below Average', 'Average',
            'Above Average', 'Good', 'Very Good', 'Great', 'Excellent', 'Magnificent', 'Exceptional', 'Spectacular' ];
        $scope.userRatings = userRatings;

        $scope.stars = [ 1, 2, 3, 4, 5 ];

        $scope.toggleOrder = function( orderBy, order ) {
            var filters = $scope.filters;
            if ( filters.orderBy === orderBy && filters.order === order ) {
                filters.orderBy = null;
            } else {
                filters.orderBy = orderBy;
                filters.order = order;
            }
        };

        $scope.updateStarsTo = function() {
            var filters = $scope.filters;

            var starsFrom = filters.starsFrom;
            var starsTo = filters.starsTo;

            if ( starsFrom > starsTo ) {
                filters.starsTo = starsFrom;
            }
        };

        $scope.updateStarsFrom = function() {
            var filters = $scope.filters;

            var starsFrom = filters.starsFrom;
            var starsTo = filters.starsTo;

            if ( starsFrom > starsTo ) {
                filters.starsFrom = starsTo;
            }
        };

        $scope.updateUserRatingTo = function() {
            var filters = $scope.filters;

            var userRatingFrom = filters.userRatingFrom;
            var userRatingTo = filters.userRatingTo;

            if ( userRatings.indexOf( userRatingFrom ) > userRatings.indexOf( userRatingTo ) ) {
                filters.userRatingTo = userRatingFrom;
            }
        };

        $scope.updateUserRatingFrom = function() {
            var filters = $scope.filters;

            var userRatingFrom = filters.userRatingFrom;
            var userRatingTo = filters.userRatingTo;

            if ( userRatings.indexOf( userRatingFrom ) > userRatings.indexOf( userRatingTo ) ) {
                filters.userRatingFrom = userRatingTo;
            }
        };
    } );
