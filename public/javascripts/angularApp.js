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
	  /*resolve: {
	    postPromise: ['posts', function(posts){
	      return posts.getAll();
	    }]
	  }*/
	})
	/*
    .state('posts', {
	  url: '/posts/{id}',
	  templateUrl: '/templates/posts.html',
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

//Manejo de auth
/*

.factory('auth', ['$http', '$window', function($http, $window){
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

	auth.currentUser = function(){
		if(auth.isLoggedIn()){
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload.username;
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


.controller('AuthCtrl', ['$scope','$state','auth',
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


*/

.controller('MainCtrl', ['$scope','auth',
function($scope, auth){

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


}])
/*

.controller('NavCtrl', ['$scope','auth',
    function($scope, auth){
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser;
        $scope.logOut = auth.logOut;
    }]);
*/


