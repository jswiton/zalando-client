// Application

angular
    .module('ShopApp', [
		'app.controllers',
		'app.services',
		'app.filters',
		'app.directives',
		'ngRoute'
    ])
    .config(configure);

 configure.$inject = ['$routeProvider', '$locationProvider'];
/* @ngInject */
function configure($routeProvider, $locationProvider) {
	  $routeProvider
	  	.when('/', {
	  		templateUrl: 'views/home.view.html',
	  		controller: 'ProductsListController',
	  		title: 'home'
	  	})
	  	.when('/search/:category/:pageNumber/:keywords', {
	  		templateUrl: 'views/products.list.view.html',
	  		controller: 'ProductsListController',
	  		title: 'products'
	  	})
	  	.when('/search/:category', {
	  		templateUrl: 'views/products.list.view.html',
	  		controller: 'ProductsListController',
	  		title: 'category'
	  	})
	  	.when('/search/:category/:pageNumber', {
	  		templateUrl: 'views/products.list.view.html',
	  		controller: 'ProductsListController',
	  		title: 'category'
	  	})
	  	.when('/search/:category/:brand/:pageNumber/:brandKey', {
	  		templateUrl: 'views/brand.view.html',
	  		controller: 'BrandController',
	  		title: 'brands'
	  	})
	  	.when('/product/:id/:name', {
	  		templateUrl: 'views/product.detail.view.html',
	  		controller: 'ProductDetailController',
	  		title: 'product'
	  	})
	  	.otherwise({
	  		redirectTo: '/'
	  	});

		if(window.history && window.history.pushState){
		    $locationProvider.html5Mode(true);
		}
	}