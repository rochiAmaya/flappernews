var mongoose = require('mongoose');

var TipSchema = new mongoose.Schema({

    fechaInicio: Date,
    director: String,
    codirector: String,
    titulo: String,
    descripcion: String,

    /*TODO ALUMNOS*/
});

mongoose.model('Tip', TipSchema);
