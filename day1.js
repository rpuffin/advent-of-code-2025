const day1 = (function() {
	const maxValue = 100;
	let currentValue = 50;
	let numZeroes = 0;
	let input = '';
	let parsedInput = [];

	return {
		getResult: function(part = 1) {
			input = helpers.getInput();
			this.parseInput();

			currentValue = 50;
			numZeroes = 0;
			if (part === 1) {
				// How many times does the value end up at 0?
				for (let number of parsedInput) {
					currentValue += number;

					// Make sure currentValue is always between 0 and maxValue-1
					currentValue %= maxValue;

					if (currentValue < 0) {
						// Correct for negative values
						currentValue += maxValue;
					}

					if (currentValue === 0) {
						// Count how many times we end up at 0
						numZeroes += 1;
					}
				}
				return numZeroes;
			}
			else {
				// How many times do does the pass or end up at 0?
				for (let number of parsedInput) {
					let previousValue = currentValue;

					// Calculate how many full rotations we do
					let rotations = Math.floor(Math.abs(number) / maxValue);

					// Add the remainder to the current value
					let remainder = number % maxValue;
					currentValue += remainder;
					
					if (currentValue < 0) {
						if (previousValue !== 0) {
							// Passed 0 once for this rotation since starting value wasn't 0
							rotations++;
						}

						// Correct for negative values
						currentValue += maxValue;
					}
					else if (currentValue >= maxValue) {
						// Value is over max, so we passed 0 once for this rotation
						rotations++;
						currentValue -= maxValue;
					}
					else if (currentValue === 0 && previousValue !== 0) {
						// Ended up at 0, so count that as passing it once
						rotations++;
					}
					
					numZeroes += rotations;
				}
				return numZeroes;
			}
		},
		parseInput: function() {
			parsedInput = input.split('\n').map(line => line.replace('L', '-').replace('R', '')).map(Number);
		}
	};
})();