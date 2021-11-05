const fs = require('fs');
const pathForCheck = ( __dirname + '/files');
const pathForTarget = ( __dirname + '/files-copy');

fs.mkdir(pathForTarget, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(pathForTarget,['utf8' , {withFileTypes: true}] ,(err, files) => {
  if(err) throw err;
  if (files.length !== 0) {
    files.forEach((i) => {
      fs.unlink(pathForTarget + '/' + i, (err) => {
        if (err) throw err;
      });
    });
  }
});

fs.readdir(pathForCheck,['utf8' , {withFileTypes: true}] ,(err, files) => {
  if(err) throw err;
  files.forEach((i,index) => {
    let pathForCheckFile = pathForCheck + '/' + files[index];
    fs.stat(pathForCheckFile, (err, stat) => {
      if (err) {console.log(err);
      }
      if (stat.isFile() === true) {
        fs.copyFile(pathForCheck + '/' + i, pathForTarget + '/' + i, (err) => {
          if (err) {console.log('Ошибочка вышла ===', err);}
          console.log(i);
        });
      }
    });
  });
});