var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
titulo: String,
descripcion: String
author: String,
/*TODO materias y tags*/
});

mongoose.model('Idea', IdeaSchema);
