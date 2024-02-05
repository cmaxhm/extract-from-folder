import fs from 'fs';

const basePath: string = './content/';
const outputPath: string = __dirname + '/.' + basePath;

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

moveFiles(basePath);
