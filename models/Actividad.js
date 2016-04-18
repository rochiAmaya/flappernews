var mongoose = require('mongoose'), Schema = mongoose.Schema;

var ActividadSchema = new mongoose.Schema({
    descripcion: String
});

mongoose.model('Actividad', ActividadSchema);
