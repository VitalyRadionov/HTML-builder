const fs = require('fs');
const path = require('path');
const routToFiles = path.join(__dirname, '/styles');
const bundle = fs.createWriteStream(path.join(__dirname, '/project-dist', 'bundle.css'));

fs.readdir(routToFiles, { withFileTypes: true }, (err, filesCSS) => {
  if (err) {
    console.log("\x1b[33m", `directory 'styles' does not exist`, '\x1b[0m');
  }
  else {
    console.log('build...');
    filesCSS.filter((element) => {
      if (path.extname(element.name) === '.css') {
        fs.readFile(path.join(routToFiles, element.name), "utf8", (err, fileContent) => {
          if (err) throw err;
          else bundle.write(`${fileContent}\n`);
        });
      }
    });
  }
});