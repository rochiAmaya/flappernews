var app = angular.module('tipModule', ['ui.router', 'angularMoment', 'btorfs.multiselect']);


app.config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('login', {
	  url: '/login',
	  templateUrl: '/templates/login.html',
	  controller: 'AuthCtrl',
	  onEnter: ['$state', 'auth', function($state, auth){
	    if(auth.isLoggedIn()){
	      $state.go('home');
	    }
	  }]
	})
	.state('register', {
	  url: '/register',
	  templateUrl: '/templates/register.html',
	  controller: 'AuthCtrl',
	  onEnter: ['$state', 'auth', function($state, auth){
	    if(auth.isLoggedIn()){
	      $state.go('home');
	    }
	  }]
	})

    .state('home', {
	  url: '/home',
	  templateUrl: '/templates/home.html',
        controller: 'MainCtrl'
	})

      .state('ideas', {
          url: '/ideas',
          templateUrl: '/templates/listadoIdeas.html',
          controller: 'IdeasCtrl'
          , resolve: {
              postPromise: ['ideas', function (ideas) {
                  return ideas.getAll();
              }]
          }
      })

      .state('ideaNueva', {
          url: '/ideasnew',
          templateUrl: '/templates/newIdea.html',
          controller: 'IdeaCtrl'
          , resolve: {
              postPromise: ['materiasService', function (materiasService) {
                  return materiasService.getAll();
              }]
          }

      })

      .state('ideaDetalle', {
          url: '/ideas/:idea',
          templateUrl: '/templates/verIdea.html',
          controller: 'VerIdeaCtrl'
          , resolve: {
              postPromise: ['ideas', '$stateParams', function (ideas, $stateParams) {
                  return ideas.get($stateParams.idea)
              }]
          }
      })

      .state('ideasPendientes', {
          url: '/ideasPendientes',
          templateUrl: '/templates/listadoPendientes.html',
          controller: 'IdeasPendientesCtrl'
          , resolve: {
              postPromise: ['ideas', function (ideas) {
                  return ideas.getAllPendientes();
              }]
          }
      })

      .state('actividades', {
        url: '/actividades',
          templateUrl: '/templates/actividades.html',
          controller: 'ActividadesCtrl'
          , resolve: {
              postPromise: ['actividadesService', function (actividadesService) {
                  return actividadesService.getAll();
              }]
          }
      })
      .state('materias', {
          url: '/materias',
          templateUrl: '/templates/listadoMaterias.html',
          controller: 'MateriasCtrl'
          , resolve: {
              postPromise: ['materiasService', function (materiasService) {
                  return materiasService.getAll();
              }]
          }
      })

      .state('materiaNueva', {
          url: '/materianew',
          templateUrl: '/templates/agregarMateria.html',
          controller: 'MateriaCtrl'
      })

      .state('materiaDetalle', {
          url: '/materias/:materia',
          templateUrl: '/templates/verMateria.html',
          controller: 'VerMateriaCtrl'
          , resolve: {
              postPromise: ['materiasService', '$stateParams', function (materiasService, $stateParams) {
                  return materiasService.get($stateParams.materia)
              }]
          }
      })


  ;

  $urlRouterProvider.otherwise('home');
}])


////////////////////////////////////////////////////////////////////////////////////////////////////////


    .controller('MainCtrl', ['$scope', 'auth',
        function ($scope, auth) {

            $scope.isLoggedIn = auth.isLoggedIn;
        }]);







