var should = require("chai").should();
var expect = require("chai").expect();

var express = require("express");

var app = express();

var mongoose = require("mongoose");
var mockgoose = require("mockgoose");
var Idea = require("../../../models/Ideas");
var Materia = require("../../../models/Materias");
var Tip = require("../../../models/Tips");
var Comentario = require("../../../models/Comments");
var Actividad = require("../../../models/Activity");
var User = require("../../../models/Users");

var router = require("../../../routes/index.js");
app.use("/", router);

var passport = require('passport');

var request = require("supertest");

var dummyMiddleware = function(req, res, next) {
    next();
}

describe("router Ideas", function() {

    before(function(done) {

        mockgoose(mongoose).then(function() {
            mongoose.connect("mongodb://localhost/fruta1");
            done();
        }).catch(function(error, mongoose){
            done(error);
        })
    });

    afterEach(function(done) {
        mockgoose.reset(done);
    });

    after(function(done){

        mockgoose(mongoose).then(function() {
            mongoose.disconnect();
            done();
        }).catch(function(error){
            done(error);
        })
    });

    var idea;
    var ideas;

    beforeEach(function(done) {
        idea = new Idea();
        idea.titulo = "Dummy idea";
        idea.descripcion = "Dummy descripcion idea";
        idea.author = "Yo";
        idea.estado = "Disponible";
        idea.alumno = undefined;
        idea.save();


        idea2 = new Idea();
        idea2.titulo = "Dummy idea2";
        idea2.descripcion = "Dummy descripcion idea2";
        idea2.author = "Yo2";
        idea2.estado = "Disponible";
        idea2.alumno = undefined;
        idea2.save();


        idea3 = new Idea();
        idea3.titulo = "Dummy idea3";
        idea3.descripcion = "Dummy descripcion idea3";
        idea3.author = "Yo3";
        idea3.estado = "Eliminado";
        idea3.alumno = undefined;
        idea3.save();


        ideas = [];
        ideas.push(idea);
        ideas.push(idea2);
        ideas.push(idea3);
        done();
    });

    describe ("GET /ideas/:idea", function(){
        it("mostrar una idea", function(){
            request(app)
                .get("/ideas/" + idea._id )
                .expect(200)
                .end(function(err, response) {
                    should.not.exist(err);
                    response.body.should.have.property("titulo").equal("Dummy idea");

                });


        })

    });


    describe ("GET /ideas", function(){
        it("Listado de ideas filtrando las estado eliminado", function(){
            request(app)
                .get("/ideas")
                .expect(200)
                .end(function(err, response) {
                    should.not.exist(err);
                    should.exist(response);

                    response.should.have.property('body');
                    response.body.should.have.lengthOf(2);
                });
        })

    })


    describe ("POST /ideas", function(){
        it("Creo una nueva idea estando loggueado", function(){
           //TODO
        })

    })

});