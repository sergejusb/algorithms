function sort(numbers, lo, hi) {
    if (lo >= hi) return;

    var lt = lo;
    var gt = hi;
    var value = numbers[lo];

    var i = lo;
    var number;

    while (i <= gt) {
        if (numbers[i] < value) {
            number = numbers[i];
            numbers[i] = numbers[lt];
            numbers[lt] = number;
            i++;
            lt++;
        }
        else if (numbers[i] > value) {
            number = numbers[i];
            numbers[i] = numbers[gt];
            numbers[gt] = number;
            gt--;
        }
        else {
            i++;
        }
    }

    sort(numbers, lo, lt - 1);
    sort(numbers, gt + 1, hi);
}

function quickSort3(numbers) {
    sort(numbers, 0, numbers.length - 1);
    return numbers;
}

module.exports = quickSort3;