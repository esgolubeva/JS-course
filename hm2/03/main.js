'use strict';

function calculator(firstNumber) {
	function reduce(arr, op) {
		var temp = firstNumber;
		for (var i = 0; i < arr.length; i++) {
			temp = op(temp, arr[i]);
		}
		return temp;
	}
	return {
		sum: function() {
			return reduce(arguments, function(a, b) {
				return a + b;
			});
		},
		dif: function() {
			return reduce(arguments, function(a, b) {
				return a - b;
			});
		},
		div: function() {
			return reduce(arguments, function(a, b) {
				try {
					return a / b;
				} catch (e) {
					return Infinity;
				}
			});
		},
		mul: function() {
			return reduce(arguments, function(a, b) {
				return a * b;
			});
		}
	}
}




var myCalculator = calculator(100);

console.log(myCalculator.sum(1, 2, 3)); //вернет 106
console.log(myCalculator.dif(10, 20)); //вернет 70
console.log(myCalculator.div(2, 2)); //вернет 25
console.log(myCalculator.mul(2, 2)); //вернет 400