function shellSort(numbers) {
    var h = 1;
    while (h < numbers.length / 3) {
        h = 3 * h + 1;
    }

    for (; h >= 1; h = --h / 3) {
        for (var i = 0; i < numbers.length; i += h) {
            for (var n = i; n > 0 && numbers[n] < numbers[n-h]; n -= h) {
                var number = numbers[n];
                numbers[n] = numbers[n-h];
                numbers[n-h] = number;
            };
        };
    }

    return numbers;
}

module.exports = shellSort;