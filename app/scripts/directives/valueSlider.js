'use strict';

/**
 * @ngdoc directive
 * @name travelRepublicApp.directive:valueSlider
 * @description
 * # valueSlider
 */
angular.module( 'travelRepublicApp' )
    .directive( 'valueSlider', function( $document, $log, $window ) {
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

                var handle = element.find( 'span' );
                var track = element.find( 'div' ).first();
                track.css( {
                    'border-top': '1px solid black',
                    'border-bottom': '1px solid black'
                } );

                var trackWidth;
                var setTrackWidth = function() {
                    trackWidth = parseInt( track.css( 'width' ), 10 );
                };
                setTrackWidth();
                angular.element( $window ).bind( 'resize', setTrackWidth );

                var getHandleLeftPx = function() {
                    return parseInt( handle.css( 'left' ), 10 );
                };

                handle.css( {
                    position: 'relative',
                    backgroundColor: 'lightgrey',
                    cursor: 'pointer',
                    display: 'block',
                    width: '50px',
                    height: '20px',
                    top: '-10px',
                    left: '0'
                } );

                if ( ngModel ) {
                    ngModel.$validators.min = function( modelValue, viewValue ) {
                        var value = modelValue || viewValue;
                        return value >= min;
                    };

                    ngModel.$validators.max = function( modelValue, viewValue ) {
                        var value = modelValue || viewValue;
                        return value <= max;
                    };

                    var render = function() {
                        if ( ngModel.$modelValue >= min && ngModel.$modelValue <= max ) {
                            handle.css( 'left', ( ngModel.$modelValue - min ) / ( max - min ) * 100 + '%' );
                        }
                    };

                    ngModel.$render = render;
                }

                var startX;

                handle.on( 'mousedown', function( event ) {

                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.screenX - getHandleLeftPx();
                    $document.on( 'mousemove', mousemove );
                    $document.on( 'mouseup', mouseup );
                } );

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

                    handle.css( {
                        left:  left + 'px'
                    } );
                }

                function mouseup() {
                    $document.off( 'mousemove', mousemove );
                    $document.off( 'mouseup', mouseup );
                    if ( ngModel ) {
                        var handleLeftPx = getHandleLeftPx();
                        ngModel.$setViewValue( Math.round( min + handleLeftPx * ( max - min ) / trackWidth ) );
                        handle.css( 'left', handleLeftPx / trackWidth * 100 + '%' );
                    }
                }
            }
        };
    } );
