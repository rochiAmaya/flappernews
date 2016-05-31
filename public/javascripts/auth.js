var moduleAuth = angular.module('module.auth', ['ui.router']);


    //Manejo de auth

moduleAuth.factory('auth', ['$http', '$window', function ($http, $window) {
       var auth = {};

        auth.saveToken = function (token){
        $window.localStorage['flapper-news-token'] = token;
        };

        auth.getToken = function (){
        return $window.localStorage['flapper-news-token'];
        };

        auth.isLoggedIn = function(){
            var token = auth.getToken();

            if(token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        auth.isProfesor = function(){
          var token = auth.getToken();
          var payload = JSON.parse($window.atob(token.split('.')[1]));

          return payload.rol == 'Profesor';
        };

        auth.isAlumno = function(){
          var token = auth.getToken();
          var payload = JSON.parse($window.atob(token.split('.')[1]));

          return payload.rol == 'Alumno';
        };

        auth.isDirector = function(){
          var token = auth.getToken();
          var payload = JSON.parse($window.atob(token.split('.')[1]));

          return payload.rol == 'Director';
        };

        auth.currentUser = function(){
            if(auth.isLoggedIn()){
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.username;
            }
        };

        auth.currentRol = function(){
            if(auth.isLoggedIn()){
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.rol;
            }
        };


        auth.register = function(user){
          return $http.post('/register', user).success(function(data){
            auth.saveToken(data.token);
          });
        };

        auth.logIn = function(user){
          return $http.post('/login', user).success(function(data){
            auth.saveToken(data.token);
          });
        };

        auth.logOut = function(){
          $window.localStorage.removeItem('flapper-news-token');
        };

      return auth;
    }])


moduleAuth.controller('AuthCtrl', ['$scope', '$state', 'auth',
        function($scope, $state, auth){
          $scope.user = {};

          $scope.register = function(){
            auth.register($scope.user).error(function(error){
              $scope.error = error;
            }).then(function(){
              $state.go('home');
            });
          };

          $scope.logIn = function(){
            auth.logIn($scope.user).error(function(error){
              $scope.error = error;
            }).then(function(){
              $state.go('home');
            });
          };
    }])

