var express 				= require('express'),
	app 					= express(),
	bodyParser 				= require('body-parser'),
	mongoose 				= require('mongoose'),
	passport 				= require('passport'),
	localStrategy 			= require('passport-local'),
	Club 					= require('./models/club'),
	Comentarios 			= require('./models/comentarios'),
	Usuario 				= require('./models/usuario'),
	seeds 					= require('./models/seeds'),
	methodOverride 			= require('method-override');

var clubsRoutes = require('./routes/clubs'),
	commentsRoutes = require('./routes/comments'),
	indexRoutes = require('./routes/index');


mongoose.connect('mongodb://localhost/clubes');

app.use(express.static(__dirname + '/public'));

// seeds();

app.use(methodOverride('_method'));

app.use(require('express-session')({
	secret: 'Just another secret quote',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(Usuario.authenticate()));
passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));



app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.use('/', indexRoutes);
app.use('/clubs', clubsRoutes);
app.use('/clubs/:id/comments', commentsRoutes);


app.listen(3000, function(){
	console.log("Server's running")
});