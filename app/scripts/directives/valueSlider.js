'use strict';

/**
 * @ngdoc directive
 * @name travelRepublicApp.directive:valueSlider
 * @description
 * # valueSlider
 */
angular.module( 'travelRepublicApp' )
    .directive( 'valueSlider', function( $document, $log, $window, $timeout ) {
        return {
            templateUrl: 'views/valueSlider.html',
            restrict: 'E',
            scope: {
                valueSliderMin: '@',
                valueSliderMax: '@'
            },
            require: '?ngModel',
            link: function postLink( scope, element, attrs, ngModel ) {
                var min = parseInt( scope.valueSliderMin, 10 );
                var max = parseInt( scope.valueSliderMax, 10 );

                if ( min > max ) {
                    throw 'valueSlider: valueSliderMin cannot be greater than valueSliderMax';
                }

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

                var track = element.find( 'div' ).first();
                track.css( {
                    'border-top': '1px solid black',
                    'border-bottom': '1px solid black'
                } );

                var trackWidth;
                var setTrackWidth = function() {
                    trackWidth = parseInt( track.css( 'width' ), 10 );
                };

                var getLeftPx = function( element ) {
                    return parseInt( element.css( 'left' ), 10 );
                };

                var startX;

                function mousedown( event ) {
                    setTrackWidth();

                    // Prevent default dragging of selected content
                    event.preventDefault();
                    var $this = angular.element( this );
                    startX = event.screenX - getLeftPx( $this );
                    $document.on( 'mousemove', { element: $this }, mousemove );
                    $document.on( 'mouseup', { element: $this }, mouseup );
                }

                element.find( 'div' ).last().on( 'mousedown', 'span', mousedown );

                function mousemove( event ) {
                    var x = event.screenX - startX;
                    var left;

                    if ( x < 0 ) {
                        left = 0;
                    } else if ( x > trackWidth ) {
                        left = trackWidth;
                    } else {
                        left = x;
                    }

                    event.data.element.css( {
                        left:  left + 'px'
                    } );
                }

                function mouseup( event ) {
                    $document.off( 'mousemove', mousemove );
                    $document.off( 'mouseup', mouseup );
                    if ( ngModel ) {
                        var viewValue = angular.copy( ngModel.$viewValue );
                        var element = angular.element( event.data.element );
                        var handleLeftPx = getLeftPx( element );

                        viewValue[ element.index() ] = Math.round( min + handleLeftPx * ( max - min ) / trackWidth );
                        ngModel.$setViewValue( viewValue );
                        event.data.element.css( 'left', handleLeftPx / trackWidth * 100 + '%' );
                    }
                }

                if ( ngModel ) {
                    /*ngModel.$validators.min = function( modelValue, viewValue ) {
                        var value = modelValue || viewValue;
                        return value[ 0 ] >= min;
                    };

                    ngModel.$validators.max = function( modelValue, viewValue ) {
                        var value = modelValue || viewValue;
                        return value[ 1 ] <= max;
                    };*/

                    var render = function() {
                        if ( ngModel.$modelValue && ngModel.$modelValue[ 0 ] >= min && ngModel.$modelValue[ ngModel.$modelValue.length - 1 ] <= max ) {
                            scope.rangeItems = range( 1, ngModel.$viewValue.length );
                            $timeout( function() {
                                element.find( 'span' )
                                    .each( function( index, element ) {
                                        angular.element( element ).css( 'left', ( ngModel.$modelValue[ index ] - min ) / ( max - min ) * 100 + '%' );
                                    } );
                            } );
                        }
                    };

                    ngModel.$render = render;
                }
            }
        };
    } );
