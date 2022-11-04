const fs = require('fs');
const path = require('path');
const routToFiles = path.join(__dirname, '/styles');
const bundle = fs.createWriteStream(path.join(__dirname, '/project-dist', 'bundle.css'));

// const routToFilesCopy = path.join(__dirname, '/files-copy');

copyDir();

function copyDir() {
  fs.readdir(routToFiles, { withFileTypes: true }, (error, filesCSS) => {
    if (error) {
      console.log("\x1b[33m", `directory 'styles' does not exist`, '\x1b[0m');
    }
    else {
      console.log('build...');
      let arrFilesCSS = filesCSS.filter(element => path.extname(element.name) == '.css');
      console.log(arrFilesCSS);

      arrFilesCSS.forEach(element => {
        fs.readFile(path.join(routToFiles, element.name), "utf8", (err, fileContent) => {
          if (err) throw err;
          else {
            // console.log(fileContent);
            bundle.write(`${fileContent}\n`);
          }
        });
      });
    }
  });
}