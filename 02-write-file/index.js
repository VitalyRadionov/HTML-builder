const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');
const newFile = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.write('Type anything: \n');
rl.on('line', writeFile);
rl.on('SIGINT', goodbyeMassage);

function writeFile(answer) {
  if (answer.trim().match(/^exit?$/i)) {
    goodbyeMassage();
  } else {
    newFile.write(`${answer}\n`);
  };
}

function goodbyeMassage() {
  rl.write('End of input');
  rl.close();
}