const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, './secret-folder'), { withFileTypes: true }, (error, fileContent) => {
  if (error) throw error;
  fileContent.forEach(element => {
    if (element.isFile()) {
      fs.stat(path.join(__dirname, './secret-folder', element.name), (error, fileContent) => {
        if (error) throw error;
        console.log(`${path.parse(element.name).name} - ${path.extname(element.name)} - ${fileContent.size} (${(fileContent.size / 1024).toFixed(2)} KB)`);
      });
    }
  });
});
