angular
    .module('app.services')
    .factory('zalandoAPIservice', zalandoAPIservice);

zalandoAPIservice.$inject = ['$http'];

function zalandoAPIservice($http) {

    var ZALANDO_API_URL = "https://api.zalando.com";

    var service = {
        searchProducts        :   searchProducts,
        getCategoriesList     :   getCategoriesList,
        getRecommended        :   getRecommended,
        getProductDetails     :   getProductDetails,
        getRecomendedFilters  :   getRecomendedFilters
    };
    return service;

    function searchProducts(filter) {
  		return $http({
    			method: 'GET', 
    			url: ZALANDO_API_URL + '/articles' + 
            (filter.keywordsSearch ? '?fullText=' + filter.keywords + '&' : '?' ) +
            (filter.category ? 'category=' + filter.category : '') +
            (filter.brandKey ? '&brand=' + filter.brandKey : '') +
            '&page=' + filter.pageNumber +
            '&pageSize=' + filter.pageSize +
            (filter.colors.color ? '&color=' + filter.colors.color : '') +
            '&price=' + (filter.priceFrom === 0 || filter.priceFrom === '' ? '*' : filter.priceFrom) + '-' + (filter.priceTo === 0 || filter.priceTo === '' ? '*' : filter.priceTo) +
            '&sort=' + filter.sortMethods.sortMethod
    				//+ '&sort=priceAsc'
  		});
    }

    function getCategoriesList(categoryKey) {
  		return $http({
    			method: 'GET', 
    			url: ZALANDO_API_URL + '/categories/' + categoryKey
  		});
    }

    function getProductDetails(id) {
      return $http({
          method: 'GET', 
          url: ZALANDO_API_URL + '/articles/' + id
      });
    }

    function getRecommended(productId) {
      return $http({
          method: 'GET', 
          url: ZALANDO_API_URL + '/recommendations/' + productId
      });
    }

    function getRecomendedFilters(categoryKey) {
      return $http({
          method: 'GET', 
          url: ZALANDO_API_URL + '/filters?category=' + categoryKey + categoryKey
      });
    }

  }