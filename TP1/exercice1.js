// Question 1a
function fibonacciIt(n) {
    if (n==0) {return 0 ;}
    else if (n>1){
        fib_n_1 = 0;
        fib_n_2 = 1;
        while(n){
            fib_n = fib_n_1 + fib_n_2;
            fib_n_2 = fib_n_1;
            fib_n_1 = fib_n;
            n-=1;
        }
        return fib_n
    }
}

// Question 1b
function fibonacciRec(n){
    if (n==0) {return 0;}
    else if (n==1) {return 1;}
    else if (n>1) {return fibonacciRec(n-1)+fibonacciRec(n-2);}
}

// Question 1c
function fibonacciArray(array){
    results = [];
    for (i=0; i<array.length; i++){
        results.push(fibonacciRec(array[i]));
    }
    return results;
}

// Question 1d
function fibonacciMap(array){
    return array.map(fibonacciRec)
}

// try some examples
console.log(fibonacciIt(10))
console.log(fibonacciRec(10))
console.log(fibonacciMap([4,10,16]))

exports.fibonacciIt = fibonacciIt;
exports.fibonacciRec = fibonacciRec
exports.fibonacciArray = fibonacciArray
exports.fibonacciMap = fibonacciMap