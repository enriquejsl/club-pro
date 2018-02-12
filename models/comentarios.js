var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
	texto: String,
	autor: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Usuario'
		},
		username: String,
	}
});

module.exports = mongoose.model('Comentarios', commentSchema);