let validate = function (...fields) {
	let invalid = false;

	for (let i = 0, amount = fields.length; i < amount; i++) {
		if (!fields[i]) {
			invalid = true;
		}
	}

	return invalid;
};

module.exports = validate;