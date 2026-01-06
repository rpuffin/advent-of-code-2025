module.exports = {
	getResult: function(part, input) {
		let parsedInput = this.parseInput(input);

		if (part === 1) {
			// How many times is the beam split?
			let numSplits = 0;

			// Use a set to track the columns where the beam is present, to ensure each column only appear once
			let beamColumns = new Set();
			beamColumns.add(parsedInput[0].indexOf('S'));
			
			for (let row = 1; row < parsedInput.length; row++) {
				let newBeamColumns = new Set();
				for (let col of beamColumns) {
					if (parsedInput[row][col] === '^') {
						// Store new columns where beam splits
						newBeamColumns.add(col - 1);
						newBeamColumns.add(col + 1);
						numSplits++;
					}
					else {
						newBeamColumns.add(col);
					}
				}
				beamColumns = newBeamColumns;
			}
			return 'Number of splits: ' + numSplits;
		}
		else {
			// How many different timelines would a single particle end up in?
			
			// Array for storing number of beams in each column
			let beamColumns = Array(parsedInput.length).fill(0);
			beamColumns[parsedInput[0].indexOf('S')] += 1;
			
			// Go through each row and and column, update beam count depending on splitters
			for (let row = 1; row < parsedInput.length; row++) {
				for (let col = 0; col < beamColumns.length; col++) {
					if (parsedInput[row][col] === '^' && beamColumns[col] > 0) {
						beamColumns[col - 1] += beamColumns[col];
						beamColumns[col + 1] += beamColumns[col];
						beamColumns[col] = 0;
					}
				}
			}

			return 'Timelines: ' + beamColumns.reduce((a, b) => a + b, 0);
		}
	},
	parseInput: function(input) {
		return input.split('\r\n').map(line => line.split(''));
	}
};