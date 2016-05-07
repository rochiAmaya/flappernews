var mongoose = require('mongoose');

var ActivitySchema = new mongoose.Schema({
    descripcion: String,
    usuario: String,
    fecha: Date
});

mongoose.model('Activity', ActivitySchema);
