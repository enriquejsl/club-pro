var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario');
var passport = require('passport');

//------
// pagina root
//------
router.get("/", function(req, res){
	res.redirect("/clubs")
});

// ----------------------
// AUTH ROUTES
// ----------------------

router.get('/register', function(req, res){
	res.render('registrar');
});

router.post('/register', function(req, res){
	Usuario.register(new Usuario({username: req.body.username}), req.body.password, function(err, usuarioCreado){
		if(err){
			console.log(err);
			return res.render('signup');
		}
		res.redirect('/clubs');
	});
});

router.get('/login', function(req, res){
	res.render('login');
});

router.post('/login', passport.authenticate('local', {successRedirect: '/clubs', failureRedirect: '/login'}), function(req, res){});

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

function isLogged(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
};

module.exports = router;