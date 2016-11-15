function forEach(arr, func) {
	for (var i = 0; i < arr.length; i++) {
		func(arr[i]);
	}
}

function filter(arr, func) {
	var newArr = [];
	
	for (var i = 0; i < arr.length; i++) {
		if (func(arr[i])) {
			newArr[newArr.length] = arr[i];
		}
	}
	
	return newArr;
}

function map(arr, func) {
	var newArr = [];
	
	for (var i = 0; i < arr.length; i++) {
		newArr[newArr.length] = func(arr[i]);
	}
	
	return newArr;
}

function slice(arr, begin, end) {
	var newArr = [];
	
	if (end === undefined) {
		end = arr.length;
	}
	if (begin === undefined) {
		begin = 0;
	}
	if (begin < 0) {
		begin = arr.length + begin;
	}
	if (end < 0) {
		end = arr.length + end;
	}
	for (var i = begin; i < end; i++) {
		newArr[newArr.length] = arr[i];
	}
		
	return newArr;
}

function reduce(arr, func, initialVal = 0) {
	var result = initialVal;
	
	for (var i = 0; i < arr.length; i++) {
		result = func(res, arr[i]);
	}
	
	return result;
}

function splice(arr, begin, total = 0) {
	var deleted = [];
	var added = [];
	
	if (begin < 0) {
		begin = arr.length + begin;
	}
	
	if (total > arr.length - begin) {
		total = arr.length - begin; 
	}
	
	for (var i = 0; i < total; i++) {  
		deleted[deleted.length] = arr[i + begin];
	}
	
	for (var i = 0; i < arr.length - deleted.length - begin; i++) { 
		arr[i + begin] = arr[i + begin + total];
	}
	
	arr.length -= total;
	
	for (var i = 3; i < arguments.length; i++) {  
		added[added.length] = arguments[i];
	}

	arr.length += added.length;

	for (var i = 0; i < added.length; i++) { 
		arr[arr.length - 1 - i] = arr[arr.length - 1 - i - added.length];
	}
	
	for (var i = 0; i < added.length; i++) {
		arr[begin + i] = added[i];
	}

	return deleted;
}