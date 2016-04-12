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
	  controller: 'MainCtrl',
        resolve: {
            postPromise: ['ideas', function (ideas) {
                return ideas.getAll();
	    }]
        }
	})

      .state('ideas', {
          url: '/ideas/{id}',
          templateUrl: '/templates/listadoIdeas.html',
          controller: 'IdeasCtrl',
          resolve: {
              post: ['$stateParams', 'ideas', function ($stateParams, ideas) {
                  return ideas.get($stateParams.id);
              }]
          }
      })
	;

  $urlRouterProvider.otherwise('home');
}])


////////////////////////////////////////////////////////////////////////////////////////////////////////


    .controller('MainCtrl', ['$scope', 'auth', 'ideas',
        function ($scope, auth, ideas) {

	$scope.isLoggedIn = auth.isLoggedIn;

            $scope.ideas = ideas.ideas;


/*

//Cosas para ordenar
	$scope.predicate = 'upvotes';
	$scope.reverse = true;
	$scope.order = function(predicate) {
	$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
	$scope.predicate = predicate;
	};
//Orden fin

	$scope.incrementUpvotes = function(post) {
	  posts.upvote(post);
	};


	$scope.decrementUpvotes = function(post) {
	  posts.downvote(post);
	};

	$scope.addPost = function(){
	  if(!$scope.title || $scope.title === '') { return; }
	  posts.create({
	    title: $scope.title,
	    link: $scope.link,
	    creado: new Date()
	  });
	  $scope.title = '';
	  $scope.link = '';
	};
*/


        }]);



