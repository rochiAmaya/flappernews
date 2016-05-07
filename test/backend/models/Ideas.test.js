var expect = require("chai").expect;
var should = require("chai").should();

var mongoose = require("mongoose");
var mockgoose = require("mockgoose");
var Idea = require("../../../models/Ideas"); 

describe("modelo Ideas", function() {

	before(function(done) {
		mockgoose(mongoose).then(function() {
			mongoose.connect("mongodb://localhost/pruebas");
			done();
		})
	});

	afterEach(function(done) {
		mockgoose.reset(done);
	})

	var idea;

	beforeEach(function(done) {
		idea = new Idea();
		idea.titulo = "Dummy idea";
		idea.descripcion = "Dummy descripcion idea";
		idea.author = "Yo";
		idea.estado = "Disponible";
		idea.alumno = undefined; 
		idea.save(done);
	});

	describe("cambio de estado", function() {
		it("debe cambiar el estado de la idea a eliminado", function(done) {
			idea.estadoEliminado(function(err, ideaSaved) {
				should.not.exist(err);
				
				ideaSaved.should.have.property("titulo").that.equal("Dummy idea");
				ideaSaved.estado.should.be.equal("Eliminado");

				done();
			});
		});

		it("debe cambiar el estado de la idea a aceptada", function(done) {
			idea.estadoAceptada(function(err, ideaSaved) {
				should.not.exist(err);
				
				ideaSaved.should.have.property("titulo").that.equal("Dummy idea");
				ideaSaved.estado.should.be.equal("Aceptada");

				done();
			});
		});

		it("debe cambiar el estado de la idea a rechazada", function(done) {
			idea.estadoRechazada(function(err, ideaSaved) {
				should.not.exist(err);
				
				ideaSaved.should.have.property("titulo").that.equal("Dummy idea");
				ideaSaved.estado.should.be.equal("Rechazada");

				done();
			});
		});
	});
});
