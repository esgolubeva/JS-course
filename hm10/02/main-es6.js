class Calculator {
    constructor(number) {
        this.number = number;
    }

    reduce(arr, op) {
        let temp = this.number;
        for (let i = 0; i < arr.length; i++) {
            temp = op(temp, arr[i]);
        }
        return temp;
    }

    sum(...numbers) {
        return this.reduce(numbers, (a, b) => a + b);
    }

    dif(...numbers) {
        return this.reduce(numbers, (a, b) => a - b);
    }

    div(...numbers) {
        return this.reduce(numbers, function(a, b) {
            try {
                return a / b;
            } catch (e) {
                return Infinity;
            }
        });
    }

    mul(...numbers) {
        return this.reduce(numbers, (a, b) => a * b);
    }
}

class SqrCalculator extends Calculator {
    reduce(arr, op) {
        let temp = this.number;
        for (let i = 0; i < arr.length; i++) {
            temp = op(temp, arr[i]);
        }
        return temp * temp;
    }
}

let myCalculator = new SqrCalculator(100);

console.log(myCalculator.sum(1, 2, 3)); //вернет 11 236 (100 + 1 + 2 + 3 = 106 * 106)
console.log(myCalculator.dif(10, 20)); //вернет 4 900
console.log(myCalculator.div(2, 2)); //вернет 625
console.log(myCalculator.mul(2, 2)); //вернет 160 000
