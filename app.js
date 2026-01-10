const helpers = require('./helpers');

let day = 9;
let part = 2;
let useRealInput = true;

let input = helpers.getInput(day, useRealInput);

let result = helpers.getResult(day, part, input);
console.log(result);