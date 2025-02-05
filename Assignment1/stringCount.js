// Import necessary libraries to read files
const fs = require('fs');

// Get filename from CLI
const filename = process.argv[2];

// Create a character buffer to read the contents of the file
const buffer = fs.readFileSync(filename);
const contents = buffer.toString();
let lines = contents.split('\n');

// Count occurences of target words
const targets = ['towson', 'cis', 'web', 'development'];
let count = 0;

lines.forEach(line => {
    // Check if the lines contain the target words and
    // increment count as needed
    let lowercaseLine = line.toLowerCase().split(/\W+/); // handle that partial word problem
    targets.forEach(target => {
        if (lowercaseLine.includes(target)) {
            count++;
        }
    });
});

// Ouput
console.log("The total number of occurences is: " + count);