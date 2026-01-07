module.exports = {
	getResult: function(day, part, input) {

		let dayFunctions = null;
		switch (day) {
			case 1:
				dayFunctions = require('./day1');
				break;

			case 2:
				dayFunctions = require('./day2');
				break;

			case 3:
				dayFunctions = require('./day3');
				break;

			case 4:
				dayFunctions = require('./day4');
				break;

			case 5:
				dayFunctions = require('./day5');
				break;

			case 6:
				dayFunctions = require('./day6');
				break;

			case 7:
				dayFunctions = require('./day7');
				break;

			case 8:
				dayFunctions = require('./day8');
				break;
		}

		if (!dayFunctions) {
			return 'Day not implemented yet.'
		}

		return dayFunctions.getResult(part, input);
	},
	getInput: function(day, useRealInput) {
		const fs = require('node:fs');
		let filepath = useRealInput ? `other/inputs/day${day}_input.txt` : `other/inputs/day${day}_example.txt`;
		if (!fs.existsSync(filepath)) {
			return '';
		}
		return fs.readFileSync(filepath, 'utf8');
	}
};