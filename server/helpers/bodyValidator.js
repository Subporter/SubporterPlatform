let validate = (...fields) => {
	let invalid = false;

	for (let i = 0, l = fields.length; i < l; i++) {
		if (!fields[i]) {
			invalid = true;
		}
	}

	return invalid;
};

module.exports = validate;