var express= require('express');
var router = express.Router({mergeParams: true});
var Club = require('../models/club');
var Comentarios = require('../models/comentarios');


// /clubs/:id/comments

router.get("/new", estaLogueado, function(req, res){
	Club.findById(req.params.id, function(err, clubEncontrado){
		res.render('comentario-nuevo', {club: clubEncontrado});
	})
});

router.post("/", estaLogueado, function(req, res){
	Club.findById(req.params.id, function(err, clubEncontrado){
		if(err){
			res.send('Error al buscar el club');
		} else {
			Comentarios.create(req.body.comentario, function(err, comentarioCreado){
				if(err){
					res.send('Hubo un error creando los comentarios');
				} else {
					comentarioCreado.autor.id = req.user._id;
					comentarioCreado.autor.username = req.user.username;
					comentarioCreado.save();
					clubEncontrado.comentarios.push(comentarioCreado);
					clubEncontrado.save();
					res.redirect("/clubs/" + clubEncontrado._id);
				}
			})
		}
	})
});

router.get("/:comentarioid/edit", function(req, res){
	Comentarios.findById(req.params.comentarioid, function(err, comentarioEncontrado){
		if(err){
			res.redirect('back');
		} else {
			Club.findById(req.params.id, function(err, clubEncontrado){
				if(err){
					res.redirect('back');
				} else {
					res.render('editar-comentario', {comentario: comentarioEncontrado, club: clubEncontrado});
				}
			})
		}
	})
});

router.post("/:comentarioid", function(req, res){
	Comentarios.findByIdAndUpdate(req.params.comentarioid, req.body.comentario, function(err, comentarioAct){
		if(err){
			res.redirect('back');
		} else {
			res.redirect('/clubs/' + req.params.id);
		}
	})
});

router.delete("/:comentarioid", function(req, res){
	Comentarios.findByIdAndRemove(req.params.comentarioid, function(err){
		if(err){
			res.redirect('back');
		} else {
			res.redirect('/clubs/' + req.params.id);
		}
	})
});

function estaLogueado(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
};

module.exports = router;