// Empty array to store CLI arguments
let nums = [];

// Read loop
process.argv.slice(2).forEach(arg => {
    if (arg % 2 === 0) {
        nums.push(arg);
    }
});

// Output loop
process.stdout.write("The array contains: ");
if (nums.length === 0) {
    process.stdout.write("\n");
} else {
    nums.forEach(num => {
        if (num === nums.at(nums.length - 1)) {
            process.stdout.write(num + '\n');
        } else {
            process.stdout.write(num + ", ");
        }
    });
}

process.stdout.write("The length of the array is: " + nums.length + "\n");