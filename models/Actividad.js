var mongoose = require('mongoose'), Schema = mongoose.Schema;

var ActividadSchema = new mongoose.Schema({
    descripcion: String, 
    fecha: Date,
    usuario: String
});

mongoose.model('Actividad', ActividadSchema);
