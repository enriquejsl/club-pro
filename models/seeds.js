var monogoose = require('mongoose'),
Club = require('./club'),
Comentarios = require('./comentarios');


var seedClubs = [
	{nombre: "Tantra", imagen: "https://farm6.staticflickr.com/5291/5536174646_70776db80b.jpg", desc: "Random DESC"},
	{nombre: "Kilauea", imagen: "https://farm7.staticflickr.com/6040/6344826032_1e16b7beca.jpg", desc: "Random DESC"},
	{nombre: "Forza", imagen: "https://farm1.staticflickr.com/114/303102349_18c644a157.jpg", desc: "Random DESC"},
	{nombre: "Bunker", imagen: "https://farm1.staticflickr.com/2/3686865_6d0085f0d2.jpg", desc: "Random DESC"},
	{nombre: "Tantra", imagen: "https://farm6.staticflickr.com/5291/5536174646_70776db80b.jpg", desc: "Random DESC"},
	{nombre: "Kilauea", imagen: "https://farm7.staticflickr.com/6040/6344826032_1e16b7beca.jpg", desc: "Random DESC"},
	{nombre: "Forza", imagen: "https://farm1.staticflickr.com/114/303102349_18c644a157.jpg", desc: "Random DESC"},
	{nombre: "Bunker", imagen: "https://farm1.staticflickr.com/2/3686865_6d0085f0d2.jpg", desc: "Random DESC"}
];


function seed(){
	Club.remove({}, function(err){
		if(err){
			console.log('No se pudo borrar la db');
		} else {
			Comentarios.remove({}, function(err){
				if(err){
					console.log('No se pudo borrar los comentarios de la db');
				} else{
					seedClubs.forEach(function(club){
						Club.create(club, function(err, cool){
							if(err){
								console.log('Error creando el club');
							} else {
								console.log('Club creado desde seed');
								Comentarios.create({autor: 'kike', texto: 'Comentario desde seed'}, function(err, comentario){
									if(err){
										console.log('Error creando comentario');
									} else {
										cool.Comentarios.push(comentario);
										cool.save();
										console.log('Comentario creado desde seed');
									}
								})
							}
						})
					})
				}
			})
		}
	})
};

module.exports = seed;