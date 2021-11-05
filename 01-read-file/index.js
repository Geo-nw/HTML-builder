const fs = require('fs');
const path = require('path');

let stream = fs.createReadStream(path.join(__dirname, 'text.txt'),
  (err) => console.log(err)
);
stream.on('data', data =>
  process.stdout.write(data),
(err) => console.log(err)
);
