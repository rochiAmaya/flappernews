app.factory('ideas', ['$http', 'auth', function($http, auth){
    var ideasfactory = {
		ideas: []
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
            return res.data;
        });
    };

    ideasfactory.eliminar = function (id) {
        //TODO
    };


    return ideasfactory;
}]);


app.controller('IdeasCtrl', ['$scope', '$stateParams', 'ideas', 'auth',
    function ($scope, $stateParams, ideas, auth) {

        $scope.ideas = ideas.ideas;

        $scope.isLoggedIn = auth.isLoggedIn();


        $scope.predicate = 'titulo';
        $scope.reverse = true;
        $scope.order = function (predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };

        $scope.verIdea = function (id) {
            ideas.get(id)
        }

        $scope.eliminarIdea = function (id) {
            ideas.eliminarIdea(id)
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

