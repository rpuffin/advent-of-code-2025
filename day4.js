module.exports = {
	getResult: function(part, input) {
		let parsedInput = this.parseInput(input);

		if (part === 1) {
			let numAccessible = 0;

			let adjacentPositions = [
				[-1, -1], // Upper-left
				[-1, 0], // Up
				[-1, 1], // Upper-right
				[0, 1], // Right
				[1, 1], // Lower-right
				[1, 0], // Down
				[1, -1], // Lower-left
				[0, -1] // Left
			];

			for (let row = 0; row < parsedInput.length; row++) {
				for (let col = 0; col < parsedInput[row].length; col++) {
					if (parsedInput[row][col] === '.') {
						// Not a paper roll
						continue
					}

					// Check all adjacent positions
					let numAdjacent = 0;
					for (let pos of adjacentPositions) {
						if (row + pos[0] >= 0 && row + pos[0] < parsedInput.length
							&& col + pos[1] >= 0 && col + pos[1] < parsedInput[row].length
							&& parsedInput[row + pos[0]][col + pos[1]] === '@'
						) {
							// Adjacent roll found
							numAdjacent++;
						}
					}

					if (numAdjacent < 4) {
						// Roll is accessible
						numAccessible++;
					}
				}
			}

			return 'Accessible rolls: ' + numAccessible;
		}
		else {
			let numRemoved = 0;

			let adjacentPositions = [
				[-1, -1], // Upper-left
				[-1, 0], // Up
				[-1, 1], // Upper-right
				[0, 1], // Right
				[1, 1], // Lower-right
				[1, 0], // Down
				[1, -1], // Lower-left
				[0, -1] // Left
			];

			// Keep removing accessible rolls until none remain
			let isRollRemoved = true;
			while (isRollRemoved) {
				let rollsremoved = 0;
				for (let row = 0; row < parsedInput.length; row++) {
					for (let col = 0; col < parsedInput[row].length; col++) {
						if (parsedInput[row][col] === '.') {
							// Not a paper roll
							continue
						}
	
						// Check all adjacent positions
						let numAdjacent = 0;
						for (let pos of adjacentPositions) {
							if (row + pos[0] >= 0 && row + pos[0] < parsedInput.length
								&& col + pos[1] >= 0 && col + pos[1] < parsedInput[row].length
								&& parsedInput[row + pos[0]][col + pos[1]] === '@'
							) {
								// Adjacent roll found
								numAdjacent++;
							}
						}
	
						if (numAdjacent < 4) {
							// Roll is accessible
							numRemoved++;
							parsedInput[row][col] = '.';
							rollsremoved++;
						}
					}
				}

				if (rollsremoved === 0) {
					isRollRemoved = false;
				}
			}

			return 'Removed rolls: ' + numRemoved;
		}
	},
	parseInput: function(input) {
		return input.split('\r\n').map(line => line.split(''));
	}
};