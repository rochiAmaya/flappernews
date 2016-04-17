var mongoose = require('mongoose');

var IdeaSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    author: String,
    estado: String
    /*TODO materias y tags*/
});

/*Metodos de modificacion de estados*/
IdeaSchema.methods.estadoEliminado = function (cb) {
    this.estado = "Eliminado";
    this.save(cb);
};

IdeaSchema.methods.estadoRevision = function (cb) {
    this.estado = "En Revisión";

    this.save(cb);
};

IdeaSchema.methods.estadoAceptada = function (cb) {
    this.estado = "Aceptada";
    this.save(cb);
};

IdeaSchema.methods.estadoRechazada = function (cb) {
    this.estado = "Rechazada";
    this.save(cb);
};

mongoose.model('Idea', IdeaSchema);
