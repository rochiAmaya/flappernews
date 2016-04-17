var app = angular.module('tipModule', ['ui.router', 'angularMoment']);


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


  ;

  $urlRouterProvider.otherwise('home');
}])


////////////////////////////////////////////////////////////////////////////////////////////////////////


    .controller('MainCtrl', ['$scope', 'auth',
        function ($scope, auth) {

            $scope.isLoggedIn = auth.isLoggedIn;
        }]);







