'use strict';
function isAllTrue(source, filterFn) {
  if (source.length === 0) {
    throw new Error("Array is empty");
  }

  for (var i = 0; i < source.length; i++) {
    if (!filterFn(source[i])) {
      return false;
    }
  }

  return true;
}

function isNumber(elem) {
  return typeof elem === 'number';
}

var
  allNumbers = [1, 2, 4, 5, 6, 7, 8],
  someNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],
  noNumbers = ['это', 'массив', 'без', 'чисел'],
  empty = [];


console.log(isAllTrue(allNumbers, isNumber));
console.log(isAllTrue(someNumbers, isNumber));
console.log(isAllTrue(noNumbers, isNumber));
console.log(isAllTrue(empty, isNumber));