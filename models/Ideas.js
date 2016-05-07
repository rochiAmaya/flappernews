var mongoose = require('mongoose'), Schema = mongoose.Schema;

var IdeaSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    author: String,
    estado: String,
    alumno: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    /*TODO materias y tags*/
    materias: [{type: Schema.Types.ObjectId, ref: 'Materia'}],
    tags: [{type: String}]
});

/*Metodos de modificacion de estados*/
IdeaSchema.methods.estadoEliminado = function (cb) {
    this.estado = "Eliminado";
    this.save(cb);
};

IdeaSchema.methods.estadoRevision = function (usuario, cb) {
    this.estado = "En Revisión";
    this.alumno = usuario; 
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


IdeaSchema.methods.estadoRechazarPostulacion = function (cb) {
    this.estado = "Disponible";
    this.alumno = undefined;
    this.save(cb);
};

module.exports = mongoose.model('Idea', IdeaSchema);
