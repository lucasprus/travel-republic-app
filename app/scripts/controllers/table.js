'use strict';

/**
 * @ngdoc function
 * @name travelRepublicApp.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the travelRepublicApp
 */
angular.module( 'travelRepublicApp' )
    .controller( 'TableCtrl', function( $scope, $http, $q, $stateParams, $log, $state, CONFIG ) {
        var page = parseInt( $stateParams.page, 10 );
        $scope.page = page;

        $scope.$watchCollection( 'filters', function( newValue, oldValue ) {
            if ( newValue === oldValue ) {
                $scope.deferred = $q.defer();
                getResults();
                return;
            }
            $log.log( newValue, oldValue );

            $scope.deferred.resolve( 'Cancelling' );
            $state.go( 'index.table', { page: 1 }, { reload: 'index.table' } );
        } );

        var range = function( start, end ) {
            if ( end < start ) {
                return;
            }

            var result = [ start ];

            while ( start++ < end ) {
                result.push( start );
            }
            return result;
        };

        var paginationRange = function( currentPage, offset, pagesTotal ) {
            var start, end;

            if ( pagesTotal <= 2 * offset + 1 ) {
                start = 1;
                end = pagesTotal;
            } else if ( currentPage - offset <= 0 ) {
                start = 1;
                end = 2 * offset + 1;
            } else if ( currentPage + offset > pagesTotal ) {
                start = pagesTotal - 2 * offset;
                end = pagesTotal;
            } else {
                start = currentPage - offset;
                end = currentPage + offset;
            }

            return range( start, end );
        };

        var getResults = function() {
            $log.log( 'Starting request' );

            $http.get( CONFIG.apiURL + page, {
                    timeout: $scope.deferred.promise,
                    params: $scope.filters
                } ).then( function( data ) {
                    data = data.data;
                    $scope.hotels = data.results;
                    $scope.resultsTotal = data.resultsTotal;
                    $scope.resultsPerPage = data.resultsPerPage;

                    var pagesTotal = Math.ceil( data.resultsTotal / data.resultsPerPage );
                    $scope.pagesTotal = pagesTotal;
                    $scope.paginationRange = paginationRange( page, CONFIG.paginationOffset, pagesTotal );
                }, function( data ) {
                    if ( data.status === -1 ) {
                        $log.log( 'Cancelled request' );
                    }
                } );
        };
    } );
