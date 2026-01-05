module.exports = {
	getResult: function(part, input) {
		let parsedInput = this.parseInput(input);

		if (part === 1) {
			// Remove any spaces in the input, splitting each line into an array of numbers/operators
			parsedInput = parsedInput.map(line => line.trim().split(/\s+/));

			// Extract the operators from the array
			let operators = parsedInput.splice(parsedInput.length - 1, 1)[0];
			
			// Numbers are processed line by line, not column by column, prepare an array to save total for each math problem
			let totals = Array(parsedInput[0].length).fill(0);

			for (let line of parsedInput) {
				for (let i = 0; i < line.length; i++) {
					let operator = operators[i];

					if (operator === '+') {
						totals[i] += parseInt(line[i]);
					}
					else if (operator === '*') {
						if (totals[i] === 0) {
							// Make sure multiplication works correctly
							totals[i] = 1;
						}
						totals[i] *= parseInt(line[i]);
					}
				}
			}

			return 'Grand total: ' + totals.reduce((acc, val) => acc + val, 0);
		}
		else {
			// Make each line in input an array with one character in each element to be able to loop through columns
			parsedInput = parsedInput.map(line => line.split(''));
			
			let totals = [];
			let currentNumbers = [];
			let operatorLineIndex = parsedInput.length - 1;

			// Looping backwards since numbers are read right-to-left
			for (let column = parsedInput[0].length - 1; column >= 0; column--) {
				// Assemble number from column rows
				let currentNumber = '';
				for (let row = 0; row < parsedInput.length; row++) {
					let value = parsedInput[row][column].trim();
					if (value !== '' && value !== '+' && value !== '*') {
						currentNumber += parsedInput[row][column];
					}
				}
				
				if (currentNumber.length > 0) {
					currentNumbers.push(Number(currentNumber));
				}

				// Check if the column has an operator, and in that case do calculations
				let operator = parsedInput[operatorLineIndex][column].trim();
				if (currentNumbers.length > 0 && operator !== '') {
					let total = 0;
					if (operator === '+') {
						total = currentNumbers.reduce((acc, val) => acc + val, 0)
					}
					else if (operator === '*') {
						total = currentNumbers.reduce((acc, val) => acc * val, 1);
					}

					totals.push(total);

					// Reset for next calculation
					currentNumbers = [];
					continue;
				}
			}

			return 'Grand total: ' + totals.reduce((acc, val) => acc + val, 0);
		}
	},
	parseInput: function(input) {
		return input.split('\r\n');
	}
};