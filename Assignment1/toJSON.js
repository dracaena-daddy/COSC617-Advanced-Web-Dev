// Import necessary libraries to read in a text file
const fs = require('fs');

// Let's figure out how to read the file in as a command line argument
const filename = process.argv[2];

// Prevent more than one CLI argument from allowing the program to run 
if (process.argv[3]) {
    console.log("Error: Program only takes 1 file. ")
} else {
    let buffer = fs.readFileSync(filename);
    let content = buffer.toString();

    // split it on new line
    let lines = content.split('\n');

    // Create an error message if there are less than three lines in the file
    // (This translates into an array with less than three elements)
    if (lines.length < 3) {
        console.log("ERROR! The file is less than three lines.");
    } else if (lines.length === 3){
        // Exactly three lines
        let jsonObject = {
            fname: lines[0], 
            lname: lines[1],
            location: lines[2],
            other: 'N/A',
        }

        console.log(jsonObject);
    } else {
        // More than three lines
        let jsonObject = {
            fname: lines[0], 
            lname: lines[1],
            location: lines[2],
            other: lines.slice(3),
        }       

        console.log(jsonObject);
    }
}