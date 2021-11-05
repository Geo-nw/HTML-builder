const fs = require('fs');
const path = require('path');
const pathForCss = ( __dirname + '/styles');
const pathForProject = ( __dirname + '/project-dist');

fs.readdir(pathForProject,['utf8' , {withFileTypes: true}] ,(err, files) => {
  if(err) throw err;
  if (files.length > 1) {
    console.log('Файл bundle.css уже собран, не пытайтесь его ломать. ))');
    process.exit(-1);
  }
});
fs.open(pathForProject + '/bundle.css', 'a+', (err) => {
  if(err) throw err;
});
fs.readdir(pathForCss,['utf8' , {withFileTypes: true}] ,(err, files) => {
  if(err) throw err;
  if (files.length !== 0) {
    files.forEach((i,index) => {
      let pathForCssFiles = pathForCss + '/' + files[index];
      fs.stat(pathForCssFiles, (err, stat) => {
        if(err) throw err;
        if (stat.isFile() === true && path.parse(pathForCssFiles).ext === '.css') {
          fs.readFile(pathForCssFiles, 'utf8', (err, data) => {
            if(err) throw err;
            fs.appendFile(pathForProject + '/bundle.css', data, (err) => {
              if(err) throw err;
            });
          });
        }
      });
    });
  }
  console.log('файл bundle.css собран');
});