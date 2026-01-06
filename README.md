# 2025 Advent of Code with JavaScript
Back for a third year of Advent of Code, this time using JavaScript and Node.js.

## Day 1
Use modulo to keep resulting value inside the value range and figure out how many rotations has happened.

## Day 2
Part 1: Check if any number in range is evenly divisible by 2.  
Part 2: Use prime number factorization to check if numbers in ranges matches repeat patterns.

## Day 3
Use pointers to find largest number in sequence.

## Day 4
Convert input in a 2D array.
Part 1: Loop through map once and check each adjacent position, sum number of rolls and check if roll is accessible.  
Part 2: Same as part 1, but loop though map multiple times and remove rolls until no more accessible rolls are found.

## Day 5
Part 1: Simply looping each ingredient ID and checking against intervals.  
Part 2: Merging overlapping intervals to be able to use subtraction to find result.

## Day 6
Array manipulation and traversal.

## Day 7
Convert input to a 2D array.  
Part 1: Use a set to store unique columns that have a beam in them. Loop through map and check for splitters in beam columns. Use new set in loop to keep track of new beam columns.  
Part 2: BFS. Use array to store the number of beams in each input column. Loop through each row and column of input to check for splitters, updating number of particles in each column.