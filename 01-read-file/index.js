const fs = require('node:fs');
const path = require('node:path');
const rr = fs.createReadStream(path.join(__dirname, './text.txt'), 'utf-8');

// Event: 'data'
rr.on('data', (data) => {
  console.log(data);
});

// fs.readFile
// fs.readFile(path.join(__dirname, './text.txt'), 'utf-8', (error, fileContent) => {
//   if (error) throw error;
//   console.log(fileContent);
// });