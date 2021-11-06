const path = require('path');
const fs = require('fs');
const pathForCheck = path.join( __dirname, '/', 'secret-folder');

fs.readdir(pathForCheck,['utf8' , {withFileTypes: true}] ,(err, files) => {
  if(err) throw err;
  files.forEach((i,index) => {
    let pathForCheckFile = path.join(pathForCheck, '/', files[index]);
    fs.stat(pathForCheckFile, (err, stat) => {
      if (err) {console.log(err);
      }
      if (stat.isFile() === true) {
        let nameFile = path.parse(pathForCheckFile).name;
        let extFile = path.parse(pathForCheckFile).ext;
        console.log(`${nameFile}${extFile.replace('.', ' - ')}`, `- ${stat.size} bytes`);
      }
    });
  });
});