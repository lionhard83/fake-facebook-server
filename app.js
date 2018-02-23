var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var friends = require('./routes/friends');
var users = require('./routes/users');
var posts = require('./routes/posts');

app.get('/', function (req, res) {
    res.json({message:'Hello World'});
})
app.use('/friends', friends);
app.use('/users', users);
app.use('/posts', posts);


app.listen(3001);
module.exports = app;
