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


test("Standard Positive Square Root", () => {
    expect(imaginarySquareRoot(4)).toBe("+/-2");
    expect(imaginarySquareRoot(25)).toBe("+/-5");
});
test("Imaginary Numbers", () => {
    expect(imaginarySquareRoot(-4)).toBe("2i");
    expect(imaginarySquareRoot(-25)).toBe("5i");
});
