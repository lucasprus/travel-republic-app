'use strict';

/**
 * @ngdoc overview
 * @name travelRepublicApp
 * @description
 * # travelRepublicApp
 *
 * Main module of the application.
 */
angular
    .module( 'travelRepublicApp', [
        'ngAnimate',
        'ngSanitize',
        'ngTouch',
        'ui.router'
    ] )
    .config( function( $stateProvider, $urlRouterProvider ) {
        $stateProvider
        .state( 'index', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        } )
        .state( 'index.table', {
            url: '/page:page',
            templateUrl: 'views/table.html',
            controller: 'TableCtrl'
        } )
        .state( 'about', {
            url: '/about',
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
        } );

        $urlRouterProvider.otherwise( '/page1' );
    } )
    .constant( 'CONFIG', {
        apiURL: 'http://localhost:3000/hotels/page',
        paginationOffset: 3
    } );
