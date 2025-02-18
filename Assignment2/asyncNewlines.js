// uses a single asynchronous filesystem operation to read a file and print the number of newlines it contains to the console 
const fs = require('fs');
const file = process.argv[2];

fs.readFile(file, 'utf8', (err, data) => {
  if (err) throw err;
  const newlines = data.split('\n').length - 1;
  console.log(newlines);
}
);