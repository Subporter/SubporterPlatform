const mocha = require('mocha');

let app = require('../../server/bin/www');

describe('Running all tests', () => {
    require('./userTesting');
    require('./sportTesting');
    require('./countryTesting');
	require('./addressTesting');
    require('./socketTesting');

    after(function() {
        setTimeout(() => {
            process.exit();
        }, 5000);
    });
});