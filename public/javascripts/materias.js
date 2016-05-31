app.factory('materiasService', ['$http', 'auth', function($http, auth){
    var materiasfactory = {
        materias: [],
        materiaDetalle: {},
    };


    materiasfactory.getAll = function () {
        return $http.get('/materias')
            .success(function (data) {
                angular.copy(data, materiasfactory.materias);
            });
    };


    materiasfactory.create = function (materia) {
        return $http.post('/materias', materia, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function (data) {
            materiasfactory.materias.push(data);
        });
    };


    materiasfactory.get = function (id) {
        return $http.get('/materias/' + id).then(function (res) {
            angular.copy(res.data, materiasfactory.materiaDetalle);
        });
    };

    materiasfactory.eliminar = function (materia, index) {
        return $http.put('/materias/' + materia._id + '/eliminar', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function (data) {
            materiasfactory.materias.splice(index, 1);
        });
    };

    return materiasfactory;
}]);


app.controller('MateriasCtrl', ['$scope', '$stateParams', 'materiasService', 'auth', '$state',
    function ($scope, $stateParams, materiasService, auth, $state) {

        $scope.materias = materiasService.materias;

        $scope.isLoggedIn = auth.isLoggedIn;


        $scope.predicate = 'titulo';
        $scope.reverse = true;
        $scope.order = function (predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };

        $scope.verMateria = function (id) {
            $state.go('materiaDetalle', {materia: id}, {})
        }

        $scope.eliminarMateria = function (materia, index) {
            materiasService.eliminar(materia, index)
        }


    }]);


app.controller('MateriaCtrl', ['$scope', '$stateParams', 'materiasService', 'auth',
    function ($scope, $stateParams, materiasService, auth) {

        $scope.isLoggedIn = auth.isLoggedIn;

        $scope.addMateria = function () {
            if (!$scope.titulo || $scope.titulo === '') {
                return;
            }

            materiasService.create({
                titulo: $scope.titulo,
                descripcion: $scope.descripcion
            });
            $scope.titulo = '';
            $scope.descripcion = '';
        };
    }]);


app.controller('VerMateriaCtrl', ['$scope', '$stateParams', 'materiasService', 'auth',
    function ($scope, $stateParams, materiasService, auth) {

        $scope.materia = materiasService.materiaDetalle;

        $scope.isLoggedIn = auth.isLoggedIn;


    }]);