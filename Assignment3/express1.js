// Basic express server example with '/' endpoint
var express = require('express');
var app = express();

// Change path to something else
app.get('/', function(req, res){
	res.send("hello world")

	// url.parse for express (preferred)
	// const fname = req.query.fname;
	// console.log(fname)
});

console.log("Navigate to http://localhost:3000/")


// Can make the second param a function
app.listen(3000);