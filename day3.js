module.exports = {
	getResult: function(part, input) {
		let parsedInput = this.parseInput(input);

		if (part === 1) {
			// What is the total output of all lines when turning on two batteries?
			let sumOutput = 0;
			for (let line of parsedInput) {
				// Make line into array of numbers
				let numbers = line.split('').map(Number);

				let first = 0;
				let second = 0;

				// Check each digit to find the two largest
				for (let i = 0; i < numbers.length; i++) {
					if (i !== numbers.length - 1 && numbers[i] > first) {
						// Last digit can't be the first largest
						first = numbers[i];
						second = 0;
					}
					else if (numbers[i] > second) {
						second = numbers[i];
					}
				}

				sumOutput += Number(first.toString() + second.toString());
			}

			return 'Total output: ' + sumOutput;
		}
		else {
			// What is the total output of all lines when turning on twelve batteries?
			let sumOutput = 0;
			for (let line of parsedInput) {
				// Make line into array of numbers
				let numbers = line.split('').map(Number);

				// Set up array to hold top twelve numbers
				const numBatteries = 12;
				let topNumbers = Array(numBatteries).fill(0);

				// Check each digit to find the twelve largest
				for (let i = 0; i < numbers.length; i++) {
					let insertedNumber = false;
					for (let j = 0; j < topNumbers.length; j++) {
						if (insertedNumber) {
							// Previous number was inserted, reset all following numbers
							topNumbers[j] = 0;
						}
						else {
							// Ensure enough numbers remain to fill all battery slots
							if (i + (numBatteries - j) <= numbers.length && numbers[i] > topNumbers[j]) {
								topNumbers[j] = numbers[i];
								insertedNumber = true;
							}
						}
					}
				}

				sumOutput += Number(topNumbers.join(''));
			}

			return 'Total output: ' + sumOutput;
		}
	},
	parseInput: function(input) {
		return input.split('\r\n');
	}
};