'use strict';

// const { test } = require("@jest/globals");


function imaginarySquareRoot(number){
    var result
    try{
        result = squareRoot(number);
    } catch (e){
        result = squareRoot(-number);
        return `${result}i`;
    }
    return (`+/-${result}`);

}

function squareRoot(x){
    if (x < 0){
        throw new RangeError("Cannot square root a negative number");
    }
    return Math.sqrt(x);
}

document.getElementById("calculate").addEventListener('click', callback);

function callback(){
    let text = document.getElementById("number").value;
    document.getElementById("answer").innerHTML = imaginarySquareRoot(text);
}

