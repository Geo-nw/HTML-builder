const fs = require('fs');
const path = require('path');
const pathForCheck = path.join( __dirname, '/', 'project-dist');
const pathForTemplateFile = path.join( __dirname, '/', 'template.html');
const pathForComponents = path.join(__dirname, 'components');
let outStreamHTML = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));



fs.access(pathForCheck, (err) => {
  if (!err) {
    console.error('Папка уже существует');
    return;
  }
  fs.mkdir(pathForCheck, (err) => {
    if (err) throw err;
  });
});


fs.readdir(pathForComponents, 'utf8', (err, files) => {
  if(err) throw err;
  files.forEach((i,index) => {
    let pathForComponentsFile = path.join(pathForComponents, '/', files[index]);
    let streamComponentsFile = fs.createReadStream(pathForComponentsFile,
      (err) => console.log(err)
    );
    streamComponentsFile.on('data', comp => {
      if (err) throw err;
      /*process.stdout.write(comp);*/
      console.log(files[index]);
      outStreamHTML.write(`${comp}\n`);
      outStreamHTML.on('data', masck => {
        if(err) throw err;
        process.stdout.write(masck);
      });
    });
  });
});