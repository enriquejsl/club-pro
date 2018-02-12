var mongoose = require('mongoose');
var Comentarios = require('./comentarios');

var clubSchema = new mongoose.Schema({
	nombre: String,
	imagen: String,
	desc: String,
	autor: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	comentarios: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comentarios'}]
});


module.exports = mongoose.model('Club', clubSchema);

