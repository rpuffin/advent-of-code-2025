const helpers = (function() {
	let day = 1;
	let part = 1;
	let useReal = 0;
	return {
		getResult: function(selectedDay, selectedPart, selectedType) {
			day = parseInt(selectedDay);
			part = parseInt(selectedPart);
			useReal = parseInt(selectedType);

			let dayFunctions = null;
			switch (day) {
				case 1:
					dayFunctions = day1;
					break;
			}

			if (!dayFunctions) {
				return 'Day not implemented yet.'
			}
			
			return dayFunctions.getResult(part);
		},
		getInput: function() {
			let input = '';
			if (useReal) {
				input = inputs[day - 1] || '';
			}
			else {
				input = examples[day - 1] || '';
			}

			return input;
		}
	};
})();