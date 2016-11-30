const fs = require('fs');

fs.createReadStream('./config/subporter.env')
  .pipe(fs.createWriteStream('.env'));