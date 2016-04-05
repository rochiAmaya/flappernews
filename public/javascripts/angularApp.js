var app = angular.module('flapperNews', ['ui.router', 'angularMoment']);


app.config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('login', {
	  url: '/login',
	  templateUrl: '/login.html',
	  controller: 'AuthCtrl',
	  onEnter: ['$state', 'auth', function($state, auth){
	    if(auth.isLoggedIn()){
	      $state.go('home');
	    }
	  }]
	})
	.state('register', {
	  url: '/register',
	  templateUrl: '/register.html',
	  controller: 'AuthCtrl',
	  onEnter: ['$state', 'auth', function($state, auth){
	    if(auth.isLoggedIn()){
	      $state.go('home');
	    }
	  }]
	})

    .state('home', {
	  url: '/home',
	  templateUrl: '/home.html',
	  controller: 'MainCtrl',
	  resolve: {
	    postPromise: ['posts', function(posts){
	      return posts.getAll();
	    }]
	  }
	})
	/*
    .state('posts', {
	  url: '/posts/{id}',
	  templateUrl: '/posts.html',
	  controller: 'PostsCtrl',
	  resolve: {
	    post: ['$stateParams', 'posts', function($stateParams, posts) {
	      return posts.get($stateParams.id);
	    }]
	  }
	})
*/
	;

  $urlRouterProvider.otherwise('home');
}])


////////////////////////////////////////////////////////////////////////////////////////////////////////




app.controller('MainCtrl', ['$scope','posts','auth',
function($scope, posts, auth){

	$scope.isLoggedIn = auth.isLoggedIn;
	
	//$scope.posts = posts.posts;


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



