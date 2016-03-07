var express = require('express');
var _ = require('lodash');

var app = express();
var hotels = require('./hotels').Establishments;

function sleep(milliseconds) {
  var start = new Date().valueOf();
  while ((new Date()
    .valueOf() - start) < milliseconds) {}
}

app.get('/hotels/page:page', function(req, res) {
  var page = parseInt(req.params.page, 10);

  var results = hotels;
  var userRatings = [ 'Unrated', 'Very Poor', 'Poor', 'Unsatisfactory', 'Below Average', 'Average', 'Above Average', 'Good', 'Very Good', 'Great', 'Excellent', 'Magnificent', 'Exceptional', 'Spectacular' ];

  if (req.query.name) {
    results = _.filter(results, function(o) { return o.Name.toLowerCase().indexOf(req.query.name.toLowerCase()) > -1; });
  }

  if (req.query.starsFrom) {
    var starsFrom = parseInt(req.query.starsFrom, 10);
    results = _.filter(results, function(o) { return o.Stars >= starsFrom; });
  }

  if (req.query.starsTo) {
    var starsTo = parseInt(req.query.starsTo, 10);
    results = _.filter(results, function(o) { return o.Stars <= starsTo; });
  }

  if (req.query.userRatingFrom) {
    var userRatingFrom = req.query.userRatingFrom;
    var userRatingFromIndex = userRatings.indexOf(userRatingFrom);
    results = _.filter(results, function(o) { return userRatings.indexOf(o.UserRatingTitle) >= userRatingFromIndex; });
  }

  if (req.query.userRatingTo) {
    var userRatingTo = req.query.userRatingTo;
    var userRatingToIndex = userRatings.indexOf(userRatingTo);
    results = _.filter(results, function(o) { return userRatings.indexOf(o.UserRatingTitle) <= userRatingToIndex; });
  }

  if (req.query.orderBy) {
    var orderBy = req.query.orderBy;
    var order = req.query.order === 'desc' ? 'desc' : 'asc';
    results = _.orderBy(results, orderBy, order);
  }

  var resultsPerPage = 20;

  var resultsOnPage = results.slice(resultsPerPage * (page -1), resultsPerPage * page);
  res.header("Access-Control-Allow-Origin", "*");
  // sleep(5000);
  res.send({ data: resultsOnPage, resultsTotal: results.length, resultsPerPage: resultsPerPage });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
