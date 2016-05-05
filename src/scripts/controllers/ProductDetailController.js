angular
  .module('app.controllers')
    .controller('ProductDetailController', ProductDetailController);

  ProductDetailController.$inject = ['$scope', '$routeParams', 'zalandoAPIservice'];
  /* @ngInject */
  function ProductDetailController($scope, $routeParams, zalandoAPIservice) {
    $scope.id = $routeParams.id;
    $scope.product = null;

    activate();

    function activate() {
        return getProductDetails();
    }

    function getProductDetails() {
      zalandoAPIservice.getProductDetails($scope.id).success(function (response) {
            $scope.product = response; 
        });
    }

    $scope.getRecommended = function(productId) {
      zalandoAPIservice.getRecommended(productId).success(function (response) {
        $scope.recommendedProducts = response; 
      });
    };

  }