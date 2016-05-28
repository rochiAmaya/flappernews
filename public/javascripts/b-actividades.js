
app.factory('actividadesService', ['$http', 'auth', function($http, auth){
    var actividadesfactory = {
        actividades: []
    };


    actividadesfactory.getAll = function () {
        return $http.get('/actividades', {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        })
            .success(function (data) {
                angular.copy(data, actividadesfactory.actividades);
            });
    };

    return actividadesfactory;
}]);

app.controller('MenuCtrl', ['$scope', 'auth', 
    function ($scope, auth) {
        $scope.isProfesor = auth.isProfesor();
        $scope.isDirector = false //auth.isDirector();
        $scope.isAlumno = auth.isAlumno();
 }]);

app.controller('ActividadesCtrl', ['$scope', '$stateParams', 'actividadesService', 'auth', '$state',
    function ($scope, $stateParams, actividadesService, auth, $state) {
        $scope.actividades = actividadesService.actividades;

        $scope.isLoggedIn = auth.isLoggedIn();
 }]);