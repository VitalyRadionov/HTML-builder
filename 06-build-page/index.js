const fs = require('fs');
const path = require('path');
const projectDist = path.join(__dirname, '/project-dist');
const routToCSSFiles = path.join(__dirname, '/styles');
const routToAssets = path.join(__dirname, '/assets');
const routToAssetsCopy = path.join(projectDist, '/assets');

(function () {
  fs.stat(projectDist, (err, stats) => {
    if (err) {
      fs.mkdir(projectDist, { recursive: true }, (err) => {
        if (err) throw err;
        console.log(`directory 'project-dist' created`);
      });
    }
  });

  fs.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, data) => {
    if (err) throw err;
    else {
      console.log('build index.html');
      const templates = data.match(/{{\w+}}/g);

      templates.forEach((element) => {
        const str = fs.createReadStream(path.join(__dirname, '/components', `${element.replace(/[{|}]/g, '')}.html`), 'utf8');
        str.on('data', (chunk) => {
          data = data.replace(element, chunk);
          fs.writeFile(path.join(projectDist, `index.html`), data, (err) => {
            if (err) throw err;
            else {
              // console.log('end');
            }
          });
        });
      });
    }
    mergeStylesCSS();
    copyDir(routToAssets, routToAssetsCopy);
  });
}());

function mergeStylesCSS() {
  const bundleCSS = fs.createWriteStream(path.join(projectDist, 'style.css'));

  fs.readdir(routToCSSFiles, { withFileTypes: true }, (err, filesCSS) => {
    if (err) {
      console.log("\x1b[33m", `directory 'styles' does not exist`, '\x1b[0m');
    }
    else {
      console.log('build style.css');
      let arrFilesCSS = filesCSS.filter(element => path.extname(element.name) == '.css');

      arrFilesCSS.forEach(element => {
        fs.readFile(path.join(routToCSSFiles, element.name), "utf8", (err, fileContent) => {
          if (err) throw err;
          else {
            bundleCSS.write(`${fileContent}\n`);
          }
        });
      });
    }
  });
}

function copyDir(from, to) {
  fs.readdir(to, { withFileTypes: true }, (error, filesCopyContent) => {
    if (error) {
      fs.mkdir(to, { recursive: true }, (err) => {
        if (err) throw err;
        else copyDir(from, to);
      });
    }
    else {
      fs.readdir(from, { withFileTypes: true }, (err, fileContent) => {
        if (err) throw err;
        else {
          let arrRemoveData = filesCopyContent.filter(element => fileContent.find(item => item.name == element.name) == undefined);

          fileContent.forEach(element => {
            element.isFile() ? cf(element) : copyDir(path.join(from, element.name), path.join(to, element.name));
          });

          function cf(element) {
            fs.copyFile(path.join(from, element.name), path.join(to, element.name), (err) => {
              if (err) throw err;
              // else { console.log(`${element.name} was copied`); }
            });
          }

          if (arrRemoveData.length) {
            arrRemoveData.forEach(element => {
              fs.rm(path.join(to, element.name), { recursive: true, force: true }, (err) => {
                if (err) throw err;
                else { console.log('\x1b[31m', `${element.name} was deleted`, '\x1b[0m'); }
              });
            });
          }
        }
      });
    }
  });
}