const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output } = require('process');
const readline = require('readline');
const rl = readline.createInterface({ input, output });

let writableStream = fs.createWriteStream(path.join(__dirname, 'testFileOut.txt'),
  (err) => console.log(err)
);
console.log('Введите текст или другие символы с клавиатуры, пока не надоест. )) \n"exit" или "ctrl + c" - выход из программы.');
rl.on('line', (answer) => {
  if (answer === 'exit') {
    console.log('Вы вышли из программы.');
    rl.close();
  } else {
    writableStream.write(answer + '\n');
  }
});