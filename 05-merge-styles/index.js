const fs = require('fs');
const path = require('path');
const pathForCss = path.join( __dirname, '/','styles');
const pathForProject = path.join( __dirname, '/', 'project-dist');
const pathForProjectFile = path.join(pathForProject, '/', 'bundle.css');


fs.readdir(pathForProject,['utf8' , {withFileTypes: true}] ,(err, files) => {
  if(err) throw err;
  if (files.length > 1) {
    fs.truncate(pathForProjectFile, err => {
      if(err) throw err;
    });
  }
});

fs.open(pathForProjectFile, 'a+', (err) => {
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
            fs.appendFile(pathForProjectFile, data, (err) => {
              if(err) throw err;
            });
          });
        }
      });
    });
  }
  console.log('файл bundle.css собран');
});










