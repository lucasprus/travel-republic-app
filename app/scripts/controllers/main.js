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
        var filters = {
            name: '',
            starsFrom: '0',
            starsTo: '5',
            userRatingFrom: 'Unrated',
            userRatingTo: 'Spectacular',
            orderBy: null,
            order: null
        };
        $scope.filters = filters;

        var userRatings = [ 'Unrated', 'Very Poor', 'Poor', 'Unsatisfactory', 'Below Average', 'Average',
            'Above Average', 'Good', 'Very Good', 'Great', 'Excellent', 'Magnificent', 'Exceptional', 'Spectacular' ];
        $scope.userRatings = userRatings;

        $scope.stars = [ 0, 1, 2, 3, 4, 5 ];

        $scope.toggleOrder = function( orderBy, order ) {
            if ( filters.orderBy === orderBy && filters.order === order ) {
                filters.orderBy = null;
            } else {
                filters.orderBy = orderBy;
                filters.order = order;
            }
        };

        $scope.updateStars = function( type ) {
            var starsFrom = filters.starsFrom;
            var starsTo = filters.starsTo;

            if ( starsFrom > starsTo ) {
                if ( type === 'To' ) {
                    filters.starsTo = starsFrom;
                } if ( type === 'From' ) {
                    filters.starsFrom = starsTo;
                }
            }
        };

        $scope.updateUserRating = function( type ) {
            var userRatingFrom = filters.userRatingFrom;
            var userRatingTo = filters.userRatingTo;

            var fromIndex = userRatings.indexOf( userRatingFrom );
            var toIndex = userRatings.indexOf( userRatingTo );

            if ( fromIndex > toIndex ) {
                if ( type === 'To' ) {
                    filters.userRatingTo = userRatingFrom;
                } if ( type === 'From' ) {
                    filters.userRatingFrom = userRatingTo;
                }
            }
        };
    } );
