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
  .module('travelRepublicApp', [
    'ngAnimate',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('index', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
    })
    .state('index.table', {
      url: '/page:page',
      templateUrl: 'views/table.html',
      controller: 'TableCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl',
      controllerAs: 'about'
    });

    $urlRouterProvider.otherwise('/page1');
})
.directive('convertToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        return parseInt(val, 10);
      });
      ngModel.$formatters.push(function(val) {
        return '' + val;
      });
    }
  };
});
