let authHelper = (function () {
	let getToken = function (headers) {
		if (headers && headers.authorization) {
			let parted = headers.authorization.split(' ');
			if (parted.length === 2) {
				return parted[1];
			} else {
				return null;
			}
		} else {
			return null;
		}
	};

	return {
		getToken: getToken
	};
})();

module.exports = authHelper;