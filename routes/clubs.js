var express = require('express');
var router = express.Router();
var Club = require('../models/club');
var Comentarios = require('../models/comentarios');
var middleware = require('../middleware');




//Recuerda, todo esto esta en /clubs
//Mostrar todos los clubs
router.get("/", function(req, res){
	Club.find({}, function(err, clubs){
		if(err){
			console.log(err);
		} else {
			res.render('clubs', {clubs: clubs})
		}
	})
});

//Crear nuevo club
router.post("/", middleware.estaLogueado, function(req, res){
	Club.create(req.body.club, function(err, clubCreado){
		if(err){
			console.log(err);
		} else {
			clubCreado.autor.id = req.user._id;
			clubCreado.autor.username = req.user.username;
			clubCreado.save();
			console.log(clubCreado);
			res.redirect('clubs');
		}
	})
});

//Form de crear club
router.get("/new", middleware.estaLogueado, function(req, res){
	res.render('nuevo-club')
});

//Mostrar un club especifico
router.get("/:id", function(req, res){
	Club.findById(req.params.id).populate('Comentarios').exec(function(err, clubEncontrado){
		if(err){
			console.log(err);
		} else {
			res.render('show', {club: clubEncontrado});
		}
	});
});

//Editar club
router.get("/:id/edit", esAutor, function(req, res){
	Club.findById(req.params.id, function(err, clubEncontrado){
		if(err){
			res.send('Error inesperado');
		} else {
			res.render('editar-club', {club: clubEncontrado});
		}
	})
});

//Put request de editar
router.put("/:id", esAutor, function(req, res){
	Club.findByIdAndUpdate(req.params.id, req.body.club, function(err, updatedClub){
		if(err){
			res.send('Hubo un error al editar el club');
		} else {
			res.redirect('/clubs/' + req.params.id);
		}
	})
});

// Borrar club
router.delete('/:id', esAutor, function(req, res){
	Club.findById(req.params.id, function(err, clubEncontrado){
		if(err){
			res.send('Error');
		} else {
			Comentarios.remove({_id: {$in: clubEncontrado.comentarios}}, function(err){
				if(err){
					console.log('Error eliminando los comentarios');
				} else {
					clubEncontrado.remove();
					res.redirect('/clubs');
				}
			})
		}
	})
});



function esAutor(req, res, next){
	if(req.isAuthenticated()){
		Club.findById(req.params.id, function(err, clubEncontrado){
			if(clubEncontrado.autor.id.equals(req.user._id)){
				next();
			} else {
				res.redirect('back');
			}
		})
	} else {
		res.redirect('back');
	}
};

module.exports = router;