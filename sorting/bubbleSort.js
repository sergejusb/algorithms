function bubbleSort(numbers) {
    for (var i = numbers.length - 1; i > 0; i--) {
        for (var n = 0; n < i; n++) {
        	if (numbers[n] > numbers[n+1]) {
            	var number = numbers[n];
            	numbers[n] = numbers[n+1];
            	numbers[n+1] = number;
        	}
        };
    };

    return numbers;
}

module.exports = bubbleSort;