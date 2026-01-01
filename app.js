const helpers = require('./helpers');

let day = 2;
let part = 2;
let useRealInput = true;

let input = helpers.getInput(day, useRealInput);
//console.log(input);

let result = helpers.getResult(day, part, input);
console.log(result);