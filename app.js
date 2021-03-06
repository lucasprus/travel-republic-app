'use strict';

var express = require( 'express' );
var _ = require( 'lodash' );

var app = express();
var hotels = require( './hotels' ).Establishments;

/*function sleep( milliseconds ) {
    var start = new Date().valueOf();
    while ( ( new Date()
      .valueOf() - start ) < milliseconds ) {}
}*/

var userRatings = [ 'Unrated', 'Very Poor', 'Poor', 'Unsatisfactory', 'Below Average', 'Average',
    'Above Average', 'Good', 'Very Good', 'Great', 'Excellent', 'Magnificent', 'Exceptional', 'Spectacular' ];
var resultsPerPage = 20;

var lte = function( property, value ) {
    return function( o ) {
        return o[ property ] <= value;
    };
};

var gte = function( property, value ) {
    return function( o ) {
        return o[ property ] >= value;
    };
};

app.get( '/hotels/page:page', function( req, res ) {
    var page = parseInt( req.params.page, 10 );

    var results = hotels;

    if ( req.query.name ) {
        results = _.filter( results, function( o ) { return o.Name.toLowerCase().indexOf( req.query.name.toLowerCase() ) > -1; } );
    }

    if ( req.query.starsFrom ) {
        var starsFrom = parseInt( req.query.starsFrom, 10 );
        results = _.filter( results, gte( 'Stars', starsFrom ) );
    }

    if ( req.query.starsTo ) {
        var starsTo = parseInt( req.query.starsTo, 10 );
        results = _.filter( results, lte( 'Stars', starsTo ) );
    }

    if ( req.query.userRatingFrom ) {
        var userRatingFrom = req.query.userRatingFrom;
        var userRatingFromIndex = userRatings.indexOf( userRatingFrom );
        results = _.filter( results, function( o ) { return userRatings.indexOf( o.UserRatingTitle ) >= userRatingFromIndex; } );
    }

    if ( req.query.userRatingTo ) {
        var userRatingTo = req.query.userRatingTo;
        var userRatingToIndex = userRatings.indexOf( userRatingTo );
        results = _.filter( results, function( o ) { return userRatings.indexOf( o.UserRatingTitle ) <= userRatingToIndex; } );
    }

    if ( req.query.minCostFrom ) {
        var minCostFrom = parseInt( req.query.minCostFrom, 10 );
        results = _.filter( results, gte( 'MinCost', minCostFrom ) );
    }

    if ( req.query.minCostTo ) {
        var minCostTo = parseInt( req.query.minCostTo, 10 );
        results = _.filter( results, lte( 'MinCost', minCostTo ) );
    }

    if ( req.query.orderBy ) {
        var orderBy = req.query.orderBy;
        var order = req.query.order === 'desc' ? 'desc' : 'asc';
        results = _.orderBy( results, orderBy, order );
    }

    var resultsOnPage = results.slice( resultsPerPage * ( page - 1 ), resultsPerPage * page );
    res.header( 'Access-Control-Allow-Origin', '*' );

    // sleep(5000);
    res.send( { results: resultsOnPage, resultsTotal: results.length, resultsPerPage: resultsPerPage } );
} );

app.listen( 3000, function() {
    console.log( 'Example app listening on port 3000!' );
} );
