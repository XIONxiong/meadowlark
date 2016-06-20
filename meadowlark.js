var express = require('express');

var fortune = require('./lib/fortune.js');

var app = express();

/*
exphbs  = require('express3-handlebars'),
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
 */


//設置Handlebars試圖引擎
// var handlebars = require('express3-handlebars');// .create({ defaultLayout:'main'});     

// app.engine('handlebars', handlebars({
//   layoutsDir: 'views/layouts',
//   defaultLayout: 'main',
//   extname: '.handlebars'
// }));
// 
var handlebars = require('express3-handlebars').create({ defaultLayout:'main'}); 
// app.set('views', './views');
app.engine('handlebars', handlebars.engine);
app.set('views engine', 'handlebars');
                                
                                                       
app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);



//路由
app.get('/', function (req, res) {
	// res.type('text/plain');
	// res.send('Meadowlark Travel');
	res.render('home');
});

app.get('/about', function (req, res) {
	// res.type('text/plain');
	// res.send('About Meadowlark Travel');
	

	res.render('about', { fortune:fortune.getFortune() });
});

//Example for 404 ..not found
app.use(function (req, res) {
	// res.type('text/plain');
	res.status(404);
	// res.send('404 - Not Found');
	res.render('404');
});

//Example 500 
app.use(function (err, req, res, next){
	console.error(err.stack);
	// res.type('text/plain');
	// res.status(500);
	// res.send('500 - Server Error');
	res.status(500);
	res.render('500');
	
});

app.listen(app.get('port'), function () {
	// console.log('hahahah');
	console.log('Express started on http://localhost:'
		+ app.get('port') + '; press Ctrl-C to terminate...')
});