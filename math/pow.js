function pow(number, exp) {
    if (number === 0 && exp < 0) throw new Error("negative exponent for zero");
    if (exp === 0) return 1;

    var positive = true;
    if (exp < 0)
    {
        positive = false;
        exp *= -1;
    }

    var result = 1;
    while (exp >= 1)
    {
        if (exp % 2 !== 0)
        {
            result *= number;
        }
        number *= number;
        exp >>= 1;
    }

    return positive ? result : 1 / result;
}


module.exports = pow;