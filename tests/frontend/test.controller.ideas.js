describe("controller ideas", function() {

    var scope;

    beforeEach(module('module.ideas'));

    beforeEach(inject(function( $rootScope, $controller) {

        scope = $rootScope.$new();

        createController = function() {
            return $controller('IdeasCtrl', {
                '$scope': scope
            });
        };

    }));

    describe("prueba sobre controler de ideas", function() {
        it('comprobar las variables de ordenamiento del listado',  function() {

            var controller = createController();
            expect(scope.predicate).to.equal('titulo')
            expect(scope.reverse).to.equal(true)

        });

    });

});


describe("controller ver idea", function() {

    var scope;
    var ideas;

    beforeEach(module('module.ideas'));

    beforeEach(inject(function( $rootScope, $controller, _ideas_) {
        scope = $rootScope.$new();
        ideas = _ideas_;

        createController = function() {
            return $controller('VerIdeaCtrl', {
                '$scope': scope,
                ideas: _ideas_,
            });
        };

    }));

    describe("prueba sobre controler de ver idea", function() {
        it('comprobar inicializacion de idea',  function() {
            var ideaDetalle = {
                _id: "12345678",
                titulo : "Dummy idea",
                descripcion : "Dummy descripcion idea",
                author : "Yo",
                estado : "Disponible",
                alumno : undefined,
                comments: []
            };
            ideas.ideaDetalle = ideaDetalle;
            var controller = createController();
            expect(scope.idea).to.equal(ideaDetalle)
        });

        it('comprobar crear comentario',  function() {
            var comentario = { body: 'soy un comentario bonito'};
            var ideaDetalle = {
                _id: "12345678",
                titulo : "Dummy idea",
                descripcion : "Dummy descripcion idea",
                author : "Yo",
                estado : "Disponible",
                alumno : undefined,
                comments: []
            };
            ideas.ideaDetalle = ideaDetalle;
            ideas.crearComentario = sinon.stub().returns({
                success: function (callback) {
                    callback(comentario);
                }
            });
            var controller = createController();
            scope.idea.comentario = 'soy un comentario bonito';
            scope.crearComentario();

            expect(scope.idea.comments).to.deep.equal([comentario])
        });

    });

});
