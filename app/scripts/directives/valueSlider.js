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

                angular.element( $window ).bind( 'resize', function() {
                    $log.info( 'window resize' );
                } );

                var startX = 0, x = 0;
                var handlePosition = 0;

                var handle = element.find( 'span' );

                var track = element.find( 'div' );
                track.css( {
                    border: '1px solid black'
                } );
                var trackWidth = parseInt( track.css( 'width' ), 10 );

                handle.css( {
                    position: 'relative',
                    border: '1px solid red',
                    backgroundColor: 'lightgrey',
                    cursor: 'pointer',
                    display: 'block',
                    width: '65px',
                    top: '-10px'
                } );

                if ( ngModel ) {
                    ngModel.$parsers.push( function( value ) {
                        $log.log( 'parser', value );
                        return parseInt( value, 10 );
                    } );

                    ngModel.$validators.min = function( modelValue, viewValue ) {
                        var value = modelValue || viewValue;
                        return value >= min;
                    };

                    ngModel.$validators.max = function( modelValue, viewValue ) {
                        var value = modelValue || viewValue;
                        return value <= max;
                    };

                    var render = function() {
                        if ( ngModel.$viewValue >= min && ngModel.$viewValue <= max ) {
                            handlePosition = ( ngModel.$viewValue - min ) / ( max - min ) * trackWidth || 0;
                            handle.css( 'left', handlePosition + 'px' );
                        }
                    };

                    ngModel.$render = render;
                }

                handle.on( 'mousedown', function( event ) {

                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.screenX - handlePosition;
                    $document.on( 'mousemove', mousemove );
                    $document.on( 'mouseup', mouseup );
                } );

                function mousemove( event ) {
                    x = event.screenX - startX;

                    if ( x < 0 ) {
                        handlePosition = 0;
                    } else if ( x > trackWidth ) {
                        handlePosition = trackWidth;
                    } else {
                        handlePosition = x;
                    }

                    handle.css( {
                        left:  handlePosition + 'px'
                    } );
                }

                function mouseup() {
                    $document.off( 'mousemove', mousemove );
                    $document.off( 'mouseup', mouseup );
                    if ( ngModel ) {
                        ngModel.$setViewValue( Math.round( min + handlePosition * ( max - min ) / trackWidth ) );
                    }
                }
            }
        };
    } );
