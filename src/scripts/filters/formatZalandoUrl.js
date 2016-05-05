angular
	.module('app.filters')
		.filter('formatZalandoUrl', formatZalandoUrl);

	function formatZalandoUrl() {
		return function(input) {
			if (!input || !input.length) { return; }
			
			return input.replace("https://www.zalando.pl/", "");
		};
	}