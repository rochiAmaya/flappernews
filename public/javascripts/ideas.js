app.factory('ideas', ['$http', 'auth', function($http, auth){
    var ideasfactory = {
        ideas: [],
        ideaDetalle: {}
	};


    ideasfactory.getAll = function () {
        return $http.get('/ideas')
            .success(function (data) {
                angular.copy(data, ideasfactory.ideas);
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

    ideasfactory.eliminar = function (idea) {
        return $http.put('/ideas/' + idea._id + '/eliminar', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function (data) {
            idea.estado = "Eliminado";
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

        $scope.eliminarIdea = function (idea) {
            ideas.eliminar(idea)
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

        $scope.titulo = ideas.ideaDetalle.titulo;
        $scope.descripcion = ideas.ideaDetalle.descripcion;
        $scope.author = ideas.ideaDetalle.author;
        $scope.estado = ideas.ideaDetalle.estado;


        $scope.isLoggedIn = auth.isLoggedIn();


    }]);



