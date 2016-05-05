angular
	.module('app.filters')
		.filter('range', range);


	function range() {
		return function(input, total) {
			if (!input || !input.length) { return; }

			total = parseInt(total);
			for (var i=0; i<total; i++)
				input.push(i);
			return input;
		};
	}