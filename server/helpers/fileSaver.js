const fs = require('fs');

const fileSaver = (() => {
	const save = (file, fileName, path) => {
	    let inStream = fs.createReadStream(file);
	    let outStream = fs.createWriteStream('./public/img/uploads/' + path + fileName);
	    if (inStream.pipe(outStream)) {
	        return true;
	    } else {
	        return false;
	    }
	};

	return {
		save: save
	};
})();

module.exports = fileSaver.save;