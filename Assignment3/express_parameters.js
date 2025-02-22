var express = require('express');
var app = express();

// Change path to something else
app.get('/api/test', function(req, res) {
    if (req.query.name) {
        res.send("name param exists")
    } else {
        res.send("name param does not exist")
    }
});

console.log("Navigate to http://localhost:3000/")


// Can make the second param a function
app.listen(3000);