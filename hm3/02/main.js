function deepEqual(first, second) {
	if (typeof first === 'object' && typeof second === 'object' && first !== null && second !== null) {
		if (Object.keys(first).length !== Object.keys(second).length) {
			return false;
		}
		for (var prop in first) {
			if (second.hasOwnProperty(prop)) {
				if (!deepEqual(first[prop], second[prop])) {
					return false;
				}
			} else {
				return false;
			}
		}
		return true;
	} else {
		return first === second;
	}
}
