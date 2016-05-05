angular
  .module('app.controllers')
  .controller('CategoryController', CategoryController);

CategoryController.$inject = ['$scope', '$location', '$routeParams', 'zalandoAPIservice', 'filterService'];
/* @ngInject */
function CategoryController($scope, $location, $routeParams, zalandoAPIservice, filterService) {
    $scope.productsList = null;
    $scope.filter = filterService.getFilters();
    $scope.filter.pageNumber = $routeParams.pageNumber ? $routeParams.pageNumber : 1;
    $scope.filter.category = $routeParams.category ? $routeParams.category : 'katalog';
    $scope.filter.keywords = "";
    $scope.filter.keywordsSearch = false;
    filterService.setFilters($scope.filter);

    activate();

    function activate() {
        getCategories();
        searchCategoryProducts();
        getRecomendedFilters($scope.filter.category);
    }

    function searchCategoryProducts() {
        zalandoAPIservice.searchProducts($scope.filter).success(function (response) {
        $scope.productsList = response;
      });
    }

    function getCategories() {
        zalandoAPIservice.getCategoriesList($scope.filter.category).success(function (response) {
        $scope.categoriesList = response;
      });
    }

    function getRecomendedFilters(categoryKey) {
        zalandoAPIservice.getRecomendedFilters(categoryKey).success(function (response) {
        $scope.recomendedFilters = response; 
      });
    }

    $scope.getAllCategories = function(categoryKey) {
      zalandoAPIservice.getCategoriesList(categoryKey).success(function (response) {
        $scope.allCategoriesList = response; 
      });
    };

  }