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