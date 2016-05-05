angular
  .module('app.controllers')
  .controller('BrandController', BrandController);

  BrandController.$inject = ['$scope', '$location', '$routeParams', 'zalandoAPIservice', 'filterService'];
  /* @ngInject */
  function BrandController($scope, $location, $routeParams, zalandoAPIservice, filterService) {
      $scope.productsList = null;
      $scope.filter = filterService.getFilters();
      $scope.filter.pageNumber = $routeParams.pageNumber ? $routeParams.pageNumber : 1;
      $scope.filter.category = $routeParams.category ? $routeParams.category : 'katalog';
      $scope.filter.brandKey = $routeParams.brandKey ? $routeParams.brandKey : '';
      $scope.filter.keywords = "";
      $scope.filter.keywordsSearch = false;
      $scope.filter.brand = $routeParams.brand;

      filterService.setFilters($scope.filter);

      activate();

      function activate() {
        return searchBrandProducts();
      }

      function searchBrandProducts() {
          zalandoAPIservice.searchProducts($scope.filter).success(function (response) {
          $scope.productsList = response;
        });
      }

  }