'use strict';

describe( 'Directive: valueSlider', function() {

    // load the directive's module
    beforeEach( module( 'travelRepublicApp' ) );

    var element,
      scope;

    beforeEach( inject( function( $rootScope ) {
        scope = $rootScope.$new();
    } ) );

    xit( 'should make hidden element visible', inject( function( $compile ) {
        element = angular.element( '<value-slider></value-slider>' );
        element = $compile( element )( scope );
        expect( element.text() ).toBe( 'this is the valueSlider directive' );
    } ) );
} );
