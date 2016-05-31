

var should = require("chai").should();

describe("home", function() {

    context("cuando no hay un usuario logueado", function() {
        it("tiene que tener un encabezado", function(done) {
            browser.get("http://localhost:3000/#/home");

            element(by.css("h2")).getText().then(function(value) {
                value.should.be.equal("Bienvenido al gestor de TIPS!");
                done();
            })
        });

    })

    function logueate() {
        browser.get("http://localhost:3000/#/login");
        element(by.model("user.username")).sendKeys("pipo");
        element(by.model("user.password")).sendKeys("1234");
        element(by.buttonText("Log In")).click();
    }

    context("cuando si hay un usuario logueado", function() {
        beforeEach(function() {
            logueate();
        });

        it("no tiene que existir un link a Ingresar", function() {
            browser.get("http://localhost:3000/#/home");

            element(by.linkText("Log In")).isPresent().then(function(value) {
                value.should.be.false;
            });
        });
    })

    afterEach(function(done) {
        var botonSalir = element(by.linkText("Log Out"));
        element(by.linkText("Log Out")).isPresent().then(function(value) {
            if (value) {
                botonSalir.click().then(done);
            } else {
                done();
            }
        });
    });

});