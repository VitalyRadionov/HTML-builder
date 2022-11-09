const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, './secret-folder'), { withFileTypes: true }, (error, fileContent) => {
  if (error) throw error;
  let arrFiles = fileContent.filter(element => element.isFile());

  arrFiles.forEach((element) => {
    fs.stat(path.join(__dirname, './secret-folder', element.name), (error, fileContent) => {
      if (error) throw error;
      console.log(`${path.parse(element.name).name} - ${path.extname(element.name)} - ${fileContent.size} (${Math.ceil(fileContent.size / 1024)} KB)`);
    });
  });
});
