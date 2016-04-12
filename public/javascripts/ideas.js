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
}]);


app.controller('IdeasCtrl', ['$scope', '$stateParams', 'ideas', 'idea', 'auth',
    function ($scope, $stateParams, ideas, idea, auth) {

        $scope.idea = idea;

        $scope.isLoggedIn = auth.isLoggedIn;


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

