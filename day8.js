module.exports = {
	getResult: function(part, input) {
		let parsedInput = this.parseInput(input);

		// Calculate distances for each pair
		let distances = [];
		for (let i = 0; i < parsedInput.length - 1; i++) {
			for (let j = i + 1; j < parsedInput.length; j++) {
				let coordinatesA = parsedInput[i].split(',').map(Number);
				let coordinatesB = parsedInput[j].split(',').map(Number);

				// No need to take square root, just compare squared distances to speed up execution
				let distance = (coordinatesB[0] - coordinatesA[0]) ** 2 + (coordinatesB[1] - coordinatesA[1]) ** 2 + (coordinatesB[2] - coordinatesA[2]) ** 2;
				distances.push([parsedInput[i] + '-' + parsedInput[j], distance]);
			}
		}

		// Sort distances on lowest first
		distances.sort((a, b) => a[1] - b[1]);

		if (part === 1) {
			// What is the product of the three largest circuits?

			let numConnections = parsedInput.length;
			if (numConnections <= 20) {
				// Only do 10 connections for example input
				numConnections = 10;
			}

			let circuits = [];
			for (let i = 0; i < distances.length; i++) {
				if (i > numConnections - 1) {
					break;
				}

				let distance = distances[i];
				let coords = distance[0].split('-');
				let foundIndex = -1;

				// Check if either coordinate is already in a circuit. Uses string as circuit for easier lookup
				for (let j = 0; j < circuits.length; j++) {
					if (foundIndex === -1) {
						// Check if either coordinate is in the circuit
						if (circuits[j].includes(coords[0])) {
							if (!circuits[j].includes(coords[1])) {
								circuits[j] += '-' + coords[1];
							}
							foundIndex = j;
						}
						else if (circuits[j].includes(coords[1])) {
							if (!circuits[j].includes(coords[0])) {
								circuits[j] += '-' + coords[0];
							}
							foundIndex = j;
						}
					}
					else {
						// Check if the added coordinates are in other circuits, merge if so
						if (circuits[j].includes(coords[0]) || circuits[j].includes(coords[1])) {
							let circuitsToMerge = circuits[j].split('-');
							for (let newCircuit of circuitsToMerge) {
								if (!circuits[foundIndex].includes(newCircuit)) {
									circuits[foundIndex] += '-' + newCircuit;
								}
							}
							circuits.splice(j, 1);
							j--;
						}
					}

				}
				
				if (foundIndex === -1) {
					// Coordinates not found, add new circuit
					circuits.push(distance[0]);
				}
			}

			let circuitSizes = [];
			for (let circuit of circuits) {
				circuitSizes.push(circuit.split('-').length);
			}

			circuitSizes.sort((a, b) => b - a);
			return 'Product of three largest circuits: ' + (circuitSizes[0] * circuitSizes[1] * circuitSizes[2]);
		}
		else {
			// What is the product of multiplying the X coordinates of the last pair of boxes needed for connecting all boxes?

			// Keep track of connected coordinates to know when all are connected
			let connectedCoordinates = new Set();
			let lastCoordinates = null;

			let circuits = [];
			for (let i = 0; i < distances.length; i++) {
				let distance = distances[i];
				let coords = distance[0].split('-');
				let foundIndex = -1;

				// Check if either coordinate is already in a circuit. Uses string as circuit for easier lookup
				for (let j = 0; j < circuits.length; j++) {
					if (foundIndex === -1) {
						// Check if either coordinate is in the circuit
						if (circuits[j].includes(coords[0])) {
							if (!circuits[j].includes(coords[1])) {
								circuits[j] += '-' + coords[1];
							}
							foundIndex = j;
						}
						else if (circuits[j].includes(coords[1])) {
							if (!circuits[j].includes(coords[0])) {
								circuits[j] += '-' + coords[0];
							}
							foundIndex = j;
						}

						connectedCoordinates.add(coords[0]);
						connectedCoordinates.add(coords[1]);
					}
					else {
						// Check if the added coordinates are in other circuits, merge if so
						if (circuits[j].includes(coords[0]) || circuits[j].includes(coords[1])) {
							let circuitsToMerge = circuits[j].split('-');
							for (let newCircuit of circuitsToMerge) {
								if (!circuits[foundIndex].includes(newCircuit)) {
									circuits[foundIndex] += '-' + newCircuit;
								}
							}
							circuits.splice(j, 1);
							j--;
						}
					}

				}
				
				if (foundIndex === -1) {
					// Coordinates not found, add new circuit
					circuits.push(distance[0]);

					// Add to connected coordinates
					connectedCoordinates.add(coords[0]);
					connectedCoordinates.add(coords[1]);
				}

				if (connectedCoordinates.size === parsedInput.length && circuits.length === 1) {
					// All coordinates are now connected and in one circuit
					lastCoordinates = coords;
					break;
				}
			}

			return 'Product of X coordinates: ' + (Number(lastCoordinates[0].split(',')[0]) * Number(lastCoordinates[1].split(',')[0]));
		}
	},
	parseInput: function(input) {
		return input.split('\r\n');
	}
};