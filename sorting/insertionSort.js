function insertionSort(numbers) {
    for (var i = 0; i < numbers.length; i++) {
        for (var n = i; n > 0 && numbers[n] < numbers[n-1]; n--) {
            var number = numbers[n];
            numbers[n] = numbers[n-1];
            numbers[n-1] = number;
        }
    }

    return numbers;
}

module.exports = insertionSort;