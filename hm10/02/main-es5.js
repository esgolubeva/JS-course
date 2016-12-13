let calculator = {
    reduce: function(arr, op) {
        var temp = this.firstNumber;
        for (var i = 0; i < arr.length; i++) {
            temp = op(temp, arr[i]);
        }
        return temp;
    },
    sum: function() {
        return this.reduce(arguments, function(a, b) {
            return a + b;
        });
    },
    dif: function() {
        return this.reduce(arguments, function(a, b) {
            return a - b;
        });
    },
    div: function() {
        return this.reduce(arguments, function(a, b) {
            try {
                return a / b;
            } catch (e) {
                return Infinity;
            }
        });
    },
    mul: function() {
        return this.reduce(arguments, function(a, b) {
            return a * b;
        });
    }
}

let sqrCalculator = {
    reduce: function(arr, op) {
        var temp = this.firstNumber;
        for (var i = 0; i < arr.length; i++) {
            temp = op(temp, arr[i]);
        }
        return temp * temp;
    }
}

Object.setPrototypeOf(sqrCalculator, calculator);

function SqrCalc(n) {
    this.firstNumber = n;
}

SqrCalc.prototype = sqrCalculator;

let myCalculator = new SqrCalc(100);

console.log(myCalculator.sum(1, 2, 3)); //вернет 11 236 (100 + 1 + 2 + 3 = 106 * 106)
console.log(myCalculator.dif(10, 20)); //вернет 4 900
console.log(myCalculator.div(2, 2)); //вернет 625
console.log(myCalculator.mul(2, 2)); //вернет 160 000
