const fs = require('fs');
const path = require('path');
const pathForCheck = path.join(__dirname, '/', 'files');
const pathForTarget = path.join(__dirname, '/', 'files-copy');

fs.mkdir(pathForTarget, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(pathForTarget,['utf8' , {withFileTypes: true}] ,(err, files) => {
  if(err) throw err;
  if (files.length !== 0) {
    files.forEach((i) => {
      fs.unlink(path.join(pathForTarget, '/', i), (err) => {
        if (err) throw err;
      });
    });
  }
});

fs.readdir(pathForCheck,['utf8' , {withFileTypes: true}] ,(err, files) => {
  if(err) throw err;
  files.forEach((i,index) => {
    let pathForCheckFile = path.join(pathForCheck, '/', files[index]);
    fs.stat(pathForCheckFile, (err, stat) => {
      if (err) {console.log(err);
      }
      if (stat.isFile() === true) {
        fs.copyFile(path.join(pathForCheck, '/', i), path.join(pathForTarget, '/', i), (err) => {
          if (err) {console.log('Ошибочка вышла ===', err);}
        });
      }
    });
  });
  console.log('Готово.');
});