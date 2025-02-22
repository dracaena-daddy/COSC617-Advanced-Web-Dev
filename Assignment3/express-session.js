var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

app.use(cookieParser());

app.use(session({
   secret: "some_cookie", //hash representing the session
   name: "cookie_name",
   resave: true, //session to be saved back in session store
   saveUninitialized: true //forces unitialized session to be saved in store
}));

app.get('/', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " time(s)");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});
app.listen(3000);