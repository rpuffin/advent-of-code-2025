module.exports = {
	getResult: function(part, input) {
		let parsedInput = this.parseInput(input);

		if (part === 1) {
			// Adding up invalid numbers in ranges where a number pattern is repeated twice
			let invalidSum = 0;

			for (let [start, end] of parsedInput) {
				let startStr = start.toString();
				let endStr = end.toString();

				let minLength = Math.min(startStr.length, endStr.length);
				let maxLength = Math.max(startStr.length, endStr.length);

				if (minLength === maxLength && minLength % 2 !== 0) {
					// Range is not an even length and can't contain invalid numbers
					continue;
				}

				let startLeft = minLength % 2 === 0 ? startStr.slice(0, startStr.length / 2) : startStr.slice(0, startStr.length / 2 + 1);
				let endLeft = maxLength % 2 === 0 ? endStr.slice(0, endStr.length / 2) : endStr.slice(0, endStr.length / 2 + 1);

				if (startLeft === endLeft) {
					// Left halves are the same for start and end, only one invalid number possible
					let invalidCandidate = Number(startLeft + startLeft);
					if (invalidCandidate >= start && invalidCandidate <= end) {
						invalidSum += invalidCandidate;
						continue;
					}
				}

				// Need to loop through left half range to check for invalid numbers
				let currentLeft = startLeft;
				while (Number(currentLeft) <= Number(endLeft)) {
					let invalidCandidate = Number(currentLeft + currentLeft);
					if (invalidCandidate >= start && invalidCandidate <= end) {
						invalidSum += invalidCandidate;
					}

					// Increment current half
					currentLeft = (Number(currentLeft) + 1).toString();
				}
			}

			return 'Invalid numbers sum: ' + invalidSum;
		}
		else {
			// Adding up invalid numbers in ranges where a number pattern is repeated at least twice
			let invalidSum = 0;

			const primeNumbers = [1, 2, 3, 5, 7];
			const patternLengths = {4: [2], 6: [2, 3], 8: [2, 4], 9: [3], 10: [2, 5]};

			for (let [start, end] of parsedInput) {
				let startStr = start.toString();
				let endStr = end.toString();

				let minLength = Math.min(startStr.length, endStr.length);
				let maxLength = Math.max(startStr.length, endStr.length);

				// Save all found invalids to avoid double counting
				let foundInvalids = new Set();

				// Check if any first digit is repeated in range
				for (let i = 1; i < 10; i++) {
					let firstDigit = i.toString();
					if (minLength > 1) {
						let invalidCandidate = Number(firstDigit.repeat(minLength));
						if (invalidCandidate >= start && invalidCandidate <= end) {
							// Number is in range, so is invalid. Add and save it
							invalidSum += invalidCandidate;
							foundInvalids.add(invalidCandidate);
						}
					}

					// Account for different lengths in start and end of range
					if (minLength !== maxLength) {
						invalidCandidate = Number(firstDigit.repeat(maxLength));
						if (invalidCandidate >= start && invalidCandidate <= end) {
							// Number is in range, so is invalid. Add and save it
							invalidSum += invalidCandidate;
							foundInvalids.add(invalidCandidate);
						}
					}
				}

				// Check for other repeated patterns, if length of numbers in range are not prime
				if (!primeNumbers.includes(minLength) || !primeNumbers.includes(maxLength)) {
					let currentNumber = start;
					while (currentNumber <= end) {
						// Convert to string for pattern checking
						let currentStr = currentNumber.toString();
						if (!primeNumbers.includes(currentStr.length) && !foundInvalids.has(currentNumber)) {
							let patterns = patternLengths[currentStr.length];
							// Check if the current number matches any repeated patterns
							for (let patternLength of patterns) {
								let pattern = currentStr.slice(0, patternLength);
								let invalidCandidate = Number(pattern.repeat(currentStr.length / patternLength));
								if (invalidCandidate === currentNumber && !foundInvalids.has(invalidCandidate)) {
									// Number matches repeated pattern and hasn't been counted yet
									invalidSum += invalidCandidate;
									foundInvalids.add(invalidCandidate);
								}
							}
						}
						currentNumber++;
				}
				}
			}

			return 'Invalid numbers sum: ' + invalidSum;
		}
	},
	parseInput: function(input) {
		return input.split(',').map(range => {
			const [start, end] = range.split('-').map(Number);
			return [start, end];
		});
	}
};