const mocha = require('mocha');

let app = require('../../server/bin/www');

require('./userTesting');
require('./sportTesting');
require('./countryTesting');
require('./addressTesting');

after(function () {
	setTimeout(function () {
		process.exit();
	}, 5000);
});