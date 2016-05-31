
var should = require("chai").should();

describe("ideas page", function() {

    function logueate(username, password) {
        browser.get("http://localhost:3000/#/login");
        element(by.model("user.username")).sendKeys(username);
        element(by.model("user.password")).sendKeys(password);
        element(by.buttonText("Log In")).click();
    }

    function desloguear(done) {
        var botonSalir = element(by.linkText("Log Out"));
        element(by.linkText("Log Out")).isPresent().then(function(value) {
            if (value) {
                botonSalir.click().then(done);
            } else {
                done();
            }
        });
    }

    function loguearComoAlumno() {
        logueate("alumno", "alumno");
    }

    function loguearComoProfesor() {
        logueate("profesor", "profesor");
    }

    it("no deja crear idea sin titulo", function() {
        loguearComoProfesor();
        browser.get("http://localhost:3000/#/ideasnew");

        element(by.buttonText("Crear")).click();
        browser.getCurrentUrl().then(function (url) {
            url.should.be.equal('http://localhost:3000/#/ideasnew')
        });
    });

    it("crear una idea", function() {
        loguearComoProfesor();
        browser.get("http://localhost:3000/#/ideasnew");

        element(by.model("titulo")).sendKeys("idea uno");
        element(by.model("descripcion")).sendKeys("descripcion de idea uno");
        element(by.buttonText("Crear")).click();
        element(by.css('.alert-success strong')).getText().then(function(value) {
            value.should.be.equal('Success!');
        });
    });

    it("postularme a una idea", function() {
        loguearComoProfesor();
        browser.get("http://localhost:3000/#/ideasnew");

        element(by.model("titulo")).sendKeys("idea-4");
        element(by.model("descripcion")).sendKeys("descripcion de idea uno");
        element(by.buttonText("Crear")).click();
        desloguear();

        loguearComoAlumno();
        browser.get("http://localhost:3000/#/ideas");
        var parent = element(by.id('idea-4'));
        parent.element(by.css('.postular-button')).click();
        parent.element(by.css('.estado')).getText().then(function (value) {
            value.should.be.equal('En Revisión');
        });
    });

    afterEach(function(done) {
        desloguear(done);
    });

});

