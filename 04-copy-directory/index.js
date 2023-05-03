const fs = require('fs');
const path = require('path');
const routToFiles = path.join(__dirname, '/files');
const routToFilesCopy = path.join(__dirname, '/files-copy');

copyDir();

function copyDir() {
  fs.readdir(routToFilesCopy, { withFileTypes: true }, (error, filesCopyContent) => {
    if (error) {
      console.log("\x1b[33m", `directory 'files-copy' does not exist`, '\x1b[0m');
      console.log(`make directory 'files-copy'...`);
      fs.mkdir(routToFilesCopy, { recursive: true }, (err) => {
        if (err) throw err;
        else copyDir();
      });
    }
    else {
      console.log(`directory 'files-copy' exists`);
      console.log('copying...');

      fs.readdir(routToFiles, { withFileTypes: true }, (err, fileContent) => {
        if (err) throw err;
        else {
          const arrFiles = fileContent.filter(element => element.isFile());
          const arrFilesCopy = filesCopyContent.filter(element => arrFiles.find(item => item.name == element.name) == undefined);

          arrFiles.forEach((element) => {
            fs.copyFile(path.join(routToFiles, element.name), path.join(routToFilesCopy, element.name), (err) => {
              if (err) throw err;
              else { console.log(`${element.name} was copied`); }
            });
          });

          if (arrFilesCopy.length) {
            arrFilesCopy.forEach(element => {
              fs.unlink(path.join(routToFilesCopy, element.name), (err) => {
                if (err) throw err;
                else { console.log('\x1b[31m', `${element.name} was deleted`, '\x1b[0m'); }
              });
            })
          }
        }
      });
    }
  });
}