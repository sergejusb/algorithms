function selectionSort(numbers) {
    for (var i = 0; i < numbers.length; i++) {
        var min = i;
        for (var n = i + 1; n < numbers.length; n++) {
            if (numbers[n] < numbers[min]) {
                min = n;
            }
        }
        var number = numbers[i];
        numbers[i] = numbers[min];
        numbers[min] = number;
    }

    return numbers;
}

module.exports = selectionSort;