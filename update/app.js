/* app.js */

//require modules
var express = require('express');


// var path = require('path');
var bodyParser = require('body-parser');
var app = express();

//configure app
app.set('view engine', 'ejs');

//use middleware
app.use(express.static(__dirname + '/public'));//this displays the style.css and normalize.css file


//define routes
app.get('/', function(req, res){
	res.render('home');
	console.log('inside home page!');


});

app.get('/home', function(req, res){
	res.render('home');

	console.log('inside home page!');
});

app.get('/teams', function (req, res){
	// res.render('teams');
	res.render('teams', { //these are placeholdre (NOT ACTUAL DATA)
		teams:[ 
		'bananas',
		'milk', 
		'lettuce',
		'Eggs',
		'Juice',
		'Bathing Soap',
		'Juice',
		'Bathing Soap',
		'bananas',
		'milk', 
		'lettuce',
		'Eggs',
		'Juice',
		'Bathing Soap',
		'Juice',
		'Bathing Soap'  
		]   
	})
	console.log('inside /teams page');
});

app.get('/star-players', function (req, res){
	res.render('star-players');
	console.log('inside /star-players page');
});

app.get('/timeline', function (req, res){
	res.render('timeline');
	console.log('inside /timeline page');
});

app.get('/teams', function (req, res){
	res.render('teams');
	console.log('inside /teams page');
});

app.get('/about-us', function(req, res){
	res.render('about-us');

	console.log('inside about-us page!');
});
//displaying on web app
app.listen(8080, function(){
	console.log('ready on port 8080');
});
