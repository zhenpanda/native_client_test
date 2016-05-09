/* Server Configs */
/* ----------- ----------- ----------- ----------- -----------  */
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

var app = express();
//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public/twod'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
	extended: false
}))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// database
var pg = require('pg');
// Localhost setup
/*
var dbUrl  = "pg://localhost/lonely_planet_db";
*/
var conString = "postgres://localhost/testdb";
 
//this initializes a connection pool 
//it will keep idle connections open for a (configurable) 30 seconds 
//and set a limit of 10 (also configurable) 
pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
/*  
  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
    //output: 1 
*/
  client.query('SELECT table_schema,table_name FROM information_schema.tables ORDER BY table_schema,table_name', function(err, result) {
    done();
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows);
  });
});

// var routes = require('./controllers/burgers_controller.js');

// app.use('/', routes);
// app.use('/update', routes);
// app.use('/create', routes);

var port = 3000;
app.listen(port);

// Home route
app.get('/', function(req, res) {
	res.render('index');
});

// Test route
app.get('/twod', function(req, res) {
	res.render('twod');
});