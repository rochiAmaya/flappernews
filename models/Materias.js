var mongoose = require('mongoose');

var MateriaSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String
});


mongoose.model('Materia', MateriaSchema);
