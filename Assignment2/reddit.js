const fs = require('fs');
const _ = require('lodash');

// read the JSON file (or text)
const filePath = process.argv[2];

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    process.exit(1);
  }

  // parse the JSON data
  const comments = JSON.parse(data);

  // return an array with every username 
  const usernames = _.map(comments, 'username');
  console.log('Usernames (with repeats):', usernames);

  // display each username as a key 
  const groupedByUser = _.groupBy(comments, 'username');
  console.log('\nGrouped by Username:', groupedByUser);

  // unique username
  const uniqueUsernames = _.uniq(usernames);
  console.log('\nUnique Usernames:', uniqueUsernames);

  // ascneding order
  const sortedComments = _.orderBy(comments, ['username'], ['asc']);
  console.log('\nSorted Comments (Original JSON with Usernames in Ascending Order):', JSON.stringify(sortedComments, null, 2));
});