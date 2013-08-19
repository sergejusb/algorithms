function shellSort(numbers) {
    var h = 1;
    while (h < numbers.length / 3) {
        h = 3 * h + 1;
    }

    while (h > 0) {
        for (var i = h; i < numbers.length; i += h) {
            for (var n = i; n > 0 && numbers[n] < numbers[n-h]; n -= h) {
                var number = numbers[n];
                numbers[n] = numbers[n-h];
                numbers[n-h] = number;
            }
        }
        h = --h / 3;
    }

    return numbers;
}

module.exports = shellSort;