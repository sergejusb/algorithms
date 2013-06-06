function pow_naive(number, exp) {
    if (number === 0 && exp < 0) throw new Error("negative exponent for zero");
    if (exp === 0) return 1;

    var positive = true;
    if (exp < 0)
    {
        positive = false;
        exp *= -1;
    }
    
    var result = 1;
    for (var i = 1; i <= exp; i++)
    {
        result *= number;
    }
    
    return positive ? result : 1 / result;
}


module.exports = pow_naive;