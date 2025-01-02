// Use needle library for HTTP requests
const needle = require('needle');
// Use node's file system module to write to files
const fs = require('node:fs');

// Store command line arguments starting from index 2
const args = process.argv.slice(2);
// Extract the first command line argument aka URL
const arg1 = args[0];
// Extract the second command line argument aka local file path
const arg2 = args[1];

// Making HTTP request using needle library
needle.get(arg1, (error, response, body) => {
  if (error) {
    console.log('error:', error);
    return;
  }

  if (response.statusCode === 200) {
    // If the status is OK write the body to the local file
    fs.writeFile(arg2, body, err => {
      if (err) {
        console.error('Error writing to file',err);
      } else {
        console.log(`Downloaded and saved ${body.length} bytes to ${arg2}`);
      }
    });
  } else {
    console.log(`Failed to download. Status code: ${response.statusCode}`);
  }
});