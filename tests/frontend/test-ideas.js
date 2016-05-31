describe("factory ideas", function() {

    var ideas;
    var $httpBackend;

    beforeEach(module('module.ideas'));

    beforeEach(inject(function(_ideas_, _$httpBackend_) {
        ideas = _ideas_;
        $httpBackend = _$httpBackend_;
    }));

    describe("get all listado ideas", function() {
        it('get all cuando el listado tiene una idea',  function(done) {


            var listado =[{
                _id: "12345678",
                titulo : "Dummy idea",
                descripcion : "Dummy descripcion idea",
                author : "Yo",
                estado : "Disponible",
                alumno : undefined
            }]
           ;
            var promise = ideas.getAll();
            promise.then(function() {
                ideas.ideas.should.deep.equal(listado);
                done();
            });

            var respuesta =  [{
                _id: "12345678",
                titulo : "Dummy idea",
                descripcion : "Dummy descripcion idea",
                author : "Yo",
                estado : "Disponible",
                alumno : undefined
            }];

            $httpBackend.expectGET("/ideas").respond(respuesta);
            $httpBackend.flush();
        });


      /*  it('', inject(function (ideas) {
            expect(ideas).toBeDefined();
        }))*/
    });

    describe("get", function() {
        it('get a una idea',  function(done) {

            var promise = ideas.get(12345678);
            promise.then(function() {
                ideas.ideaDetalle.should.have.property('titulo',"Dummy idea");

                done();
            });

            var respuesta =  {
                _id: "12345678",
                titulo : "Dummy idea",
                descripcion : "Dummy descripcion idea",
                author : "Yo",
                estado : "Disponible",
                alumno : undefined
            };

            $httpBackend.expectGET("/ideas/12345678").respond(respuesta);
            $httpBackend.flush();
        });
    });
    describe("postularme", function() {
        it('me postulo a una idea',  function(done) {


            var miIdea ={
                _id: "12345678",
                titulo : "Dummy idea",
                descripcion : "Dummy descripcion idea",
                author : "Yo",
                estado : "Disponible",
                alumno : undefined
            };

            var promise = ideas.postularme(miIdea);
            promise.then(function() {
                ideas.ideaDetalle.should.have.property('estado',"En Revisión");
                done();
            });

            var respuesta =  {
                _id: "12345678",
                titulo : "Dummy idea",
                descripcion : "Dummy descripcion idea",
                author : "Yo",
                estado : "Disponible",
                alumno : undefined
            };

            $httpBackend.expectPUT("/ideas/12345678/postularme").respond(respuesta);
            $httpBackend.flush();
        });
    });
});
