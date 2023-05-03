const fs = require('node:fs');
const path = require('node:path');
const rs = fs.createReadStream(path.join(__dirname, './text.txt'), 'utf-8');

rs.on('data', (data) => console.log(data));