function partition(numbers, lo, hi) {
    var i = lo,
        j = hi + 1;

    while (true) {
        while (numbers[++i] < numbers[lo]) {
            if (i == hi) break;
        }
        while (numbers[--j] > numbers[lo]) {
            if (j == lo) break;
        }

        if (i >= j) break;

        var number = numbers[i];
        numbers[i] = numbers[j];
        numbers[j] = number;
    }

    var value = numbers[lo];
    numbers[lo] = numbers[j];
    numbers[j] = value;

    return j;
}

function sort(numbers, lo, hi) {
    if (lo >= hi) return;

    var index = partition(numbers, lo, hi);
    sort(numbers, lo, index - 1);
    sort(numbers, index + 1, hi);
}

module.exports = quickSort;
function quickSort(numbers) {
    sort(numbers, 0, numbers.length - 1);
    return numbers;
}