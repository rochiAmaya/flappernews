app.factory('ideas', ['$http', 'auth', function($http, auth){
    var ideasfactory = {
        ideas: [],
        ideaDetalle: {},
        ideasPendientes: []
	};


    ideasfactory.getAll = function () {
        return $http.get('/ideas')
            .success(function (data) {
                angular.copy(data, ideasfactory.ideas);
            });
    };


    ideasfactory.getAllPendientes = function () {
        return $http.get('/ideasPendientes')
            .success(function (data) {
                angular.copy(data, ideasfactory.ideasPendientes);
            });
    };

    ideasfactory.create = function (idea) {
        return $http.post('/ideas', idea, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function (data) {
            ideasfactory.ideas.push(data);
        });
    };


    ideasfactory.get = function (id) {
        return $http.get('/ideas/' + id).then(function (res) {
            angular.copy(res.data, ideasfactory.ideaDetalle);
        });
    };

    ideasfactory.eliminar = function (idea, index) {
        return $http.put('/ideas/' + idea._id + '/eliminar', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function (data) {
        	ideasfactory.ideas.splice(index, 1);
        });
    };


    ideasfactory.postularme = function (idea) {
        return $http.put('/ideas/' + idea._id + '/postularme', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function (data) {
            idea.estado = "En Revisión";
        });
    };


    ideasfactory.aceptarPostulacion = function (idea, index) {
        return $http.put('/ideas/' + idea._id + '/aceptarPostulacion', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function (data) {
            ideasfactory.ideasPendientes.splice(index, 1);
        });
    };


    ideasfactory.rechazarPostulacion = function (idea, index) {
        return $http.put('/ideas/' + idea._id + '/rechazarPostulacion', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function (data) {
            ideasfactory.ideasPendientes.splice(index, 1);
        });
    };


    ideasfactory.crearComentario = function(id, comment) {
        return $http.post('/ideas/' + id + '/comments', comment, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
        });
    };


    return ideasfactory;
}]);


app.controller('IdeasCtrl', ['$scope', '$stateParams', 'ideas', 'auth', '$state',
    function ($scope, $stateParams, ideas, auth, $state) {

        $scope.ideas = ideas.ideas;

        $scope.isLoggedIn = auth.isLoggedIn();


        $scope.predicate = 'titulo';
        $scope.reverse = true;
        $scope.order = function (predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };

        $scope.verIdea = function (id) {
            $state.go('ideaDetalle', {idea: id}, {})
        }

        $scope.eliminarIdea = function (idea, index) {
            ideas.eliminar(idea, index)
        }

        $scope.postularmeIdea = function (idea) {
        	ideas.postularme(idea); 
        }
    }]);

app.controller('IdeaCtrl', ['$scope', '$stateParams', 'ideas', 'auth',
    function ($scope, $stateParams, ideas, auth) {

        $scope.isLoggedIn = auth.isLoggedIn();

        $scope.addIdea = function () {
            if (!$scope.titulo || $scope.titulo === '') {
                return;
            }

            ideas.create({
                titulo: $scope.titulo,
                descripcion: $scope.descripcion
            });
            $scope.titulo = '';
            $scope.descripcion = '';
        };
    }]);


app.controller('VerIdeaCtrl', ['$scope', '$stateParams', 'ideas', 'auth',
    function ($scope, $stateParams, ideas, auth) {

        $scope.idea = ideas.ideaDetalle;

        $scope.isLoggedIn = auth.isLoggedIn();


        $scope.crearComentario = function(){
            if($scope.idea.comentario === '') { return; }

            ideas.crearComentario($stateParams.idea, {
                body: $scope.idea.comentario
            }).success(function(comment) {
                $scope.idea.comments.push(comment);
            });
            $scope.idea.comentario = '';
        };



    }]);


app.controller('IdeasPendientesCtrl', ['$scope', '$stateParams', 'ideas', 'auth',
    function ($scope, $stateParams, ideas, auth) {


        $scope.ideasPendientes = ideas.ideasPendientes;

        $scope.isLoggedIn = auth.isLoggedIn();


        $scope.predicate = 'titulo';
        $scope.reverse = true;
        $scope.order = function (predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };

        $scope.verIdea = function (id) {
            $state.go('ideaDetalle', {idea: id}, {})
        }

        $scope.eliminarIdea = function (idea) {
            ideas.eliminar(idea)
        }

        $scope.rechazarPostulacion = function (idea, index) {
            ideas.rechazarPostulacion(idea, index)
        }

        $scope.aceptarPostulacion = function (idea, index) {
            ideas.aceptarPostulacion(idea, index)
        }


    }]);






