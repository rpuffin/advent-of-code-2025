module.exports = {
	getResult: function(part, input) {
		let parsedInput = this.parseInput(input);

		if (part === 1) {
			// What is the area of the largest rectangle that can be formed by any two coordinates?
			let largestArea = 0;

			for (let i = 0; i < parsedInput.length - 1; i++) {
				for (let j = i + 1; j < parsedInput.length; j++) {
					let coordinatesA = parsedInput[i];
					let coordinatesB = parsedInput[j];
					let area = this.calculateArea(coordinatesA, coordinatesB);

					if (area > largestArea) {
						largestArea = area;
					}
				}
			}

			return 'Largest area: ' + largestArea;
		}
		else {
			// What is the largest area within red and green area?
			let validAreas = [];

			// Store the shape to check for intersections. Array of rows and columns for easier lookup
			let shapeRows = {};
			let shapeCols = {};
			let rowCoords = [];
			let colCoords = [];
			for (let i = 0; i < parsedInput.length; i++) {
				let coordinateA = parsedInput[i];
				// Loop around to first coordinate
				let coordinateB = i === parsedInput.length - 1 ? parsedInput[0] : parsedInput[i + 1];

				if (coordinateA[0] === coordinateB[0]) {
					// Vertical line
					let col = coordinateA[0];
					if (!shapeCols[col]) {
						shapeCols[col] = [];
					}
					shapeCols[col].push([coordinateA[1], coordinateB[1]]);
					if (!colCoords.includes(col)) {
						colCoords.push(col);
					}
				}
				else if (coordinateA[1] === coordinateB[1]) {
					// Horizontal line
					let row = coordinateA[1];
					if (!shapeRows[row]) {
						shapeRows[row] = [];
					}
					shapeRows[row].push([coordinateA[0], coordinateB[0]]);
					if (!rowCoords.includes(row)) {
						rowCoords.push(row);
					}
				}
			}

			// Check all combinations of two coordinates to form rectangles
			for (let i = 0; i < parsedInput.length - 1; i++) {
				for (let j = i + 1; j < parsedInput.length; j++) {
					let coordinatesA = parsedInput[i];
					let coordinatesB = parsedInput[j];

					let area = this.calculateArea(coordinatesA, coordinatesB);

					let rectangleMinMaxs = {
						minX: Math.min(coordinatesA[0], coordinatesB[0]),
						maxX: Math.max(coordinatesA[0], coordinatesB[0]),
						minY: Math.min(coordinatesA[1], coordinatesB[1]),
						maxY: Math.max(coordinatesA[1], coordinatesB[1])
					};

					let isIntersected = false;
					// Rectangles with width or height of 1 will always be inside the shape, check all other rectangles
					if (coordinatesA[0] !== coordinatesB[0] && coordinatesA[1] !== coordinatesB[1]) {
						isIntersected = this.isRectangleIntersected(rectangleMinMaxs, rowCoords, shapeRows, colCoords, shapeCols);
					}

					if (!isIntersected) {
						validAreas.push(area);
					}
				}
			}

			return 'Largest area: ' + validAreas.sort((a, b) => b - a)[0];
		}
	},
	calculateArea: function(coordinatesA, coordinatesB) {
		let xLength = Math.abs(coordinatesA[0] - coordinatesB[0]) + 1;
		let yLength = Math.abs(coordinatesA[1] - coordinatesB[1]) + 1;
		return xLength * yLength;
	},
	isRectangleIntersected: function(rectangleMinMaxs, rowCoords, shapeRows, colCoords, shapeCols) {
		// Find potential intersecting rows and columns based on rectangle min/maxs
		let potentialIntersectingRows = rowCoords.filter(coord => coord > rectangleMinMaxs.minY && coord < rectangleMinMaxs.maxY);
		let potentialIntersectingCols = colCoords.filter(coord => coord > rectangleMinMaxs.minX && coord < rectangleMinMaxs.maxX);

		if (potentialIntersectingRows.length > 0) {
			for (let row of potentialIntersectingRows) {
				for (let line of shapeRows[row]) {
					let maxLineX = Math.max(line[0], line[1]);
					let minLineX = Math.min(line[0], line[1]);

					if (
						minLineX < rectangleMinMaxs.maxX
						&& maxLineX > rectangleMinMaxs.minX
						&& Math.min(maxLineX, rectangleMinMaxs.maxX) - rectangleMinMaxs.minX > 1
					) {
						// Part of the row is inside the rectangle
						return true;
					}
				}
			}
		}

		if (potentialIntersectingCols.length > 0) {
			for (let col of potentialIntersectingCols) {
				for (let line of shapeCols[col]) {
					let maxLineY = Math.max(line[0], line[1]);
					let minLineY = Math.min(line[0], line[1]);

					if (
						minLineY < rectangleMinMaxs.maxY
						&& maxLineY > rectangleMinMaxs.minY
						&& Math.min(maxLineY, rectangleMinMaxs.maxY) - rectangleMinMaxs.minY > 1
					) {
						// Part of the column is inside the rectangle
						return true;
					}
				}
			}
		}

		return false;
	},
	parseInput: function(input) {
		return input.split('\r\n').map(line => line.split(',').map(Number));
	}
};