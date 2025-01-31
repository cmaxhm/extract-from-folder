import fs from 'fs';
import * as readline from 'node:readline';

const basePath: string = './content/';
const outputPath: string = __dirname + '/.' + basePath;
const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function moveFiles(path: string) {
  fs.readdir(path, (err: NodeJS.ErrnoException | null, files: string[]) => {
    files.forEach((element: string): void => {
      const filePath: string = path + element;

      fs.stat(filePath, (err1: NodeJS.ErrnoException | null, stats: fs.Stats): void => {
        if (err1) throw err1;

        if (stats.isDirectory()) {
          moveFiles(filePath + '/');
        } else {
          fs.rename(filePath, outputPath + element, (err2: NodeJS.ErrnoException | null) => {
            if (err2) throw err2;
          });
        }
      });
    });
  });
}


function moveVideoFiles(path: string) {
  fs.readdir(path, (err: NodeJS.ErrnoException | null, files: string[]) => {
    files.forEach((element: string): void => {
      const filePath: string = path + element;

      fs.stat(filePath, (err1: NodeJS.ErrnoException | null, stats: fs.Stats): void => {
        if (err1) throw err1;

        if (stats.isDirectory()) {
          moveVideoFiles(filePath + '/');
        } else {
          if (element.includes('.mp4')) {
            fs.rename(filePath, outputPath + element, (err2: NodeJS.ErrnoException | null) => {
              if (err2) throw err2;
            });
          }
        }
      });
    });
  });
}

readLine.question('Please select the type of files you want to move (1: All files, 2: Video files): ', (answer: string) => {
  if (answer === '1') {
    moveFiles(basePath);
  } else if (answer === '2') {
    moveVideoFiles(basePath);
  } else {
    console.log('Invalid input');
  }

  readLine.close();
});
