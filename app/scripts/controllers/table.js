'use strict';

/**
 * @ngdoc function
 * @name travelRepublicApp.controller:TableCtrl
 * @description
 * # TableCtrl
 * Controller of the travelRepublicApp
 */
angular.module( 'travelRepublicApp' )
    .controller( 'TableCtrl', function( $scope, $http, $q, $stateParams, $log, $state ) {
        var page = parseInt( $stateParams.page, 10 );
        $scope.page = page;
        var offset = 3;

        $scope.$watchCollection( 'filters', function( newValue, oldValue ) {
            if ( newValue === oldValue ) {
                $scope.deferred = $q.defer();
                makeRequest();
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

        var makeRequest = function() {
            $log.log( 'Starting request' );

            $http.get( 'http://localhost:3000/hotels/page' + page, {
                    timeout: $scope.deferred.promise,
                    params: $scope.filters
                } ).then( function( data ) {
                    data = data.data;
                    $scope.hotels = data.data;
                    $scope.resultsTotal = data.resultsTotal;
                    $scope.resultsPerPage = data.resultsPerPage;

                    var pagesTotal = Math.ceil( data.resultsTotal / data.resultsPerPage );

                    $scope.pagesTotal = pagesTotal;

                    if ( pagesTotal <= 2 * offset + 1 ) {
                        $scope.pagesRange = range( 1, pagesTotal );
                    } else {
                        if ( page - offset <= 0 ) {
                            $scope.pagesRange = range( 1, 2 * offset + 1 );
                        } else if ( page + offset > pagesTotal ) {
                            $scope.pagesRange = range( pagesTotal - 2 * offset, pagesTotal );
                        } else {
                            $scope.pagesRange = range( page - offset, page + offset );
                        }
                    }
                }, function( data ) {
                    $log.log( data );
                    if ( data.status === -1 ) {
                        $log.log( 'Cancelled request' );
                    }
                } );
        };
    } );
