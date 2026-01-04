module.exports = {
	getResult: function(part, input) {
		let parsedInput = this.parseInput(input);

		if (part === 1) {
			// How many of the listed ingredients are still fresh?
			let numFresh = 0;

			for (let ingredient of parsedInput['ingredients']) {
				for (let interval of parsedInput['freshIntervals']) {
					if (ingredient >= interval[0] && ingredient <= interval[1]) {
						numFresh++;
						break;
					}
				}
			}
			return 'Num fresh ingredients: ' + numFresh;
		}
		else {
			// How many ingredients are fresh in total in ranges?
			let totalNumFresh = 0;

			
			// Remove overlapping intervals
			let intervals = parsedInput['freshIntervals'];
			while (true) {
				let foundOverlap = false;
				for (let i = 0; i < intervals.length; i++) {
					for (let j = i + 1; j < intervals.length; j++) {
						if (i === j) {
							continue;
						}

						let intervalA = intervals[i];
						let intervalB = intervals[j];

						// Check for overlap
						if (
							(intervalA[0] <= intervalB[1] && intervalA[0] >= intervalB[0])
							|| (intervalA[1] >= intervalB[0] && intervalA[1] <= intervalB[1])
							|| (intervalB[0] <= intervalA[1] && intervalB[0] >= intervalA[0])
							|| (intervalB[1] >= intervalA[0] && intervalB[1] <= intervalA[1])
						) {
							// Merge intervals
							let newInterval = [
								Math.min(intervalA[0], intervalB[0]),
								Math.max(intervalA[1], intervalB[1])
							];
							intervals.splice(j, 1);
							intervals.splice(i, 1);
							intervals.push(newInterval);
							foundOverlap = true;
						}
					}
				}

				if (!foundOverlap) {
					break;
				}
			}

			// Calculate total fresh ingredients from merged intervals
			for (let interval of intervals) {
				totalNumFresh += (interval[1] - interval[0] + 1);
			}

			return 'Total num fresh ingredients: ' + totalNumFresh;
		}
	},
	parseInput: function(input) {
		let parsed = input.split('\r\n');
		let parsedInput = {'freshIntervals': [], 'ingredients': []};
		let key = 'freshIntervals';
		for (line of parsed) {
			if (line === '') {
				key = 'ingredients';
				continue;
			}

			if (key === 'freshIntervals') {
				parsedInput[key].push(line.split('-').map(Number));
			}
			else {
				parsedInput[key].push(Number(line));
			}
		}

		return parsedInput;
	}
};