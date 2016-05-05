angular
	.module('app.filters')
		.filter('mapGender', mapGender);

	function mapGender() {

		var mapGender = function(el) {
			if (el == "MALE") { return 'Mężczyźni'; }
			if (el == "FEMALE") { return 'Kobiety'; }
		};
		
		return function(input) {
			if (!input || !input.length) { return; }

			return input.map(mapGender).join(', ');
		};
	}