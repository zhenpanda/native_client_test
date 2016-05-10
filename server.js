/* Server Configs */
/* ----------- ----------- ----------- ----------- -----------  */
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

var app = express();
//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

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
var conString = "postgres://localhost/iptv";

// var routes = require('./controllers/burgers_controller.js');
// app.use('/', routes);
// app.use('/update', routes);
// app.use('/create', routes);

var port = 3000;
app.listen(port);

// Home route
app.get('/', function(req, res) {
    res.render('test');
});

// 2d route
// app.get('/twod', function(req, res) {
// 	res.render('twod');
// });

// login route
app.post('/login', function(req, res) {
	console.log(req.body);
	/*    
	pg.connect(conString, function(err, client, done, cb) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        var nq = '';
        client.query(nq, function(err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            //console.log(result.rows);
            cb = result.rows;
		    console.log(cb);
		    res.json(cb);
        });
        done();
    });*/
	res.json({a:"gotsomething"});
});

// fetch route
app.post('/fetch', function(req, res) {
    pg.connect(conString, function(err, client, done, cb) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        var nq = 'SELECT * FROM client_package INNER JOIN channel_package ON (client_package.package_id = channel_package.package_id) INNER JOIN channel ON (channel.id = channel_package.channel_id) WHERE client_id = 2';
        client.query(nq, function(err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            //console.log(result.rows);
            cb = result.rows;
		    console.log(cb);
		    res.json(cb);
        });
        done();
    });
});