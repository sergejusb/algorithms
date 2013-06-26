function merge(numbers, tmp, lo, mid, hi) {
    for (var k = lo; k <= hi; k++) {
        tmp[k] = numbers[k];
    }
    
    var i = lo,
        j = mid + 1;
    
    for (var k = lo; k <= hi; k++) {
        if (i > mid) {
            numbers[k] = tmp[j++];
        }
        else if (j > hi) {
            numbers[k] = tmp[i++];
        }
        else if (tmp[i] <= tmp[j]) {
            numbers[k] = tmp[i++];
        }
        else {
            numbers[k] = tmp[j++];
        }
    }
}

function sort(numbers, tmp, lo, hi) {
    if (lo >= hi) return;

    var mid = lo + ((hi - lo) >> 1);

    sort(numbers, tmp, lo, mid);
    sort(numbers, tmp, mid + 1, hi);
    merge(numbers, tmp, lo, mid, hi);
}

function mergeSort(numbers) {
    var tmp = new Int32Array(numbers.length);
    sort(numbers, tmp, 0, numbers.length - 1);
    return numbers;
}

module.exports = mergeSort;