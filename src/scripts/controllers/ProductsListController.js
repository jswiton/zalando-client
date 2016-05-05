angular
  .module('app.controllers')
    .controller('ProductsListController', ProductsListController);

ProductsListController.$inject = ['$scope', '$rootScope', '$route', '$location', '$routeParams', 'zalandoAPIservice', 'filterService'];
/* @ngInject */
function ProductsListController($scope, $rootScope, $route, $location, $routeParams, zalandoAPIservice, filterService) {
  $scope.productsList = null;
  $scope.filter = filterService.getFilters();
  $scope.filter.pageNumber = $routeParams.pageNumber ? $routeParams.pageNumber : 1;
  $scope.filter.keywords = $routeParams.keywords ? $routeParams.keywords : '';
  $scope.filter.category = $routeParams.category ? $routeParams.category : 'katalog';
  $scope.filter.keywordsSearch = true;
  $scope.key = 'none';

  filterService.setFilters($scope.filter);

  activate();

  function activate() {
    return searchZalandoProducts();
  }

  function searchZalandoProducts() {
    if (!$routeParams.pageNumber) { return; }
    zalandoAPIservice.searchProducts($scope.filter).success(function (response) {
      $scope.productsList = response;
    });
  }

  $scope.go = function ( path ) {
    $location.path( path );
  };

  $scope.reload = function ( path ) {
    $route.reload();
  };

  $scope.reserFilters = function ( path ) {
    filterService.resetFilters();
    $route.reload();
  };

  //$scope.$on('$routeChangeSuccess', function(event, current) {

  //});

}