angular
	.module('app.services')
	.factory('filterService', filterService);


function filterService() {
    
    var filter = {
    	sortMethods: [
	      {'sortMethod': 'popularity'},
	      {'sortMethod': 'activationDate'},
	      {'sortMethod': 'priceDesc'},
	      {'sortMethod': 'priceAsc'},
	      {'sortMethod': 'sale'}
	  	],
	  	lov_sortMethod: [
	      {'lookupCode': 'popularity', 'description': 'popularność'},
	      {'lookupCode': 'activationDate', 'description': 'nowości'},
	      {'lookupCode': 'priceDesc', 'description': 'najwyższa cena'},
	      {'lookupCode': 'priceAsc', 'description': 'najniższa cena'},
	      {'lookupCode': 'sale', 'description': 'wyprzedaż'}
	    ],
    	pageSize: 48,
        colors: [
            {'color': 'black'},
            {'color': 'brown'},
            {'color': 'beige'},
            {'color': 'gray'},
            {'color': 'white'},
            {'color': 'blue'},
            {'color': 'petrol'},
            {'color': 'turquoise'},
            {'color': 'green'},
            {'color': 'olive'},
            {'color': 'yellow'},
            {'color': 'orange'},
            {'color': 'red'},
            {'color': 'pink'},
            {'color': 'purple'},
            {'color': 'gold'},
            {'color': 'silver'}
        ],
        lov_color: [
          {'lookupCode': 'black', 'description': 'czarny'},
          {'lookupCode': 'brown', 'description': 'brązowy'},
          {'lookupCode': 'beige', 'description': 'beżowy'},
          {'lookupCode': 'gray', 'description': 'szary'},
          {'lookupCode': 'white', 'description': 'biały'},
          {'lookupCode': 'blue', 'description': 'niebieski'},
          {'lookupCode': 'turquoise', 'description': 'turkusowy'},
          {'lookupCode': 'green', 'description': 'zielony'},
          {'lookupCode': 'olive', 'description': 'oliwkowy'},
          {'lookupCode': 'yellow', 'description': 'żółty'},
          {'lookupCode': 'orange', 'description': 'pomarańczowy'},
          {'lookupCode': 'red', 'description': 'czerwony'},
          {'lookupCode': 'pink', 'description': 'różowy'},
          {'lookupCode': 'purple', 'description': 'purpurowy'},
          {'lookupCode': 'gold', 'description': 'złoty'},
          {'lookupCode': 'silver', 'description': 'srebrny'}
        ],
        brandKey: null,
        brand: '',
        priceFrom: '',
        priceTo: '',

    };

    //Defaults
    filter.sortMethods.sortMethod = 'popularity';
    filter.colors.color = null;

    var service = {
        getFilters    : getFilters,
        setFilters : setFilters,
        resetFilters    : resetFilters
    };
    return service;

    function getFilters() {
    	return filter;
    }

    function setFilters(newFilters) {
    	 filter = newFilters;
    }

    function resetFilters() {
        filter.priceFrom = '';
        filter.priceTo = '';
        filter.colors.color = null;
        filter.brand = '';
        filter.brandKey = null;
    }

}