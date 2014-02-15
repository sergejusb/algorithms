function heapSort(numbers) {
    var count = numbers.length;
    numbers.unshift(null);
    
    for (var i = count >> 1; i > 0; i--) {
        down(numbers, i, count);
    }
    
    for (var i = count; i > 0; i--) {
        var tmp = numbers[i];
        numbers[i] =  numbers[1];
        numbers[1] = tmp;

        down(numbers, 1, --count);
    }

    numbers.shift();
    return numbers;
}

function down(items, parent, count) {
    var child = parent << 1;
    while (child <= count) {
        if (child < count) {
            child = items[child] > items[child + 1] ? child : child + 1;
        }
        
        if (items[parent] > items[child]) break;

        var tmp = items[parent];
        items[parent] = items[child];
        items[child] = tmp;

        parent = child;
        child = parent << 1;
    }
}

module.exports = heapSort;