// Create web server
// 1. npm init
// 2. npm install express --save
// 3. npm install body-parser --save
// 4. npm install ejs --save
// 5. npm install mongoose --save
// 6. npm install method-override --save

// 1. Load module
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override'); // Use for PUT, DELETE method
var app = express();

// 2. Connect to MongoDB
mongoose.connect('mongodb://localhost/comment');

// 3. Body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 4. Set view engine
app.set('view engine', 'ejs');

// 5. Set static folder
app.use(express.static(__dirname + '/public'));

// 6. Set method override
app.use(methodOverride('_method'));

// 7. Schema
var commentSchema = mongoose.Schema({
    name: String,
    comment: String,
    date: {type: Date, default: Date.now}
});

// 8. Model
var Comment = mongoose.model('Comment', commentSchema);

// 9. Routes
app.get('/', function(req, res) {
    res.redirect('/comments');
});

// 9.1. Index route
app.get('/comments', function(req, res) {
    Comment.find({}, function(err, comments) {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {comments: comments});
        }
    });
});

// 9.2. New route
app.get('/comments/new', function(req, res) {
    res.render('new');
});

// 9.3. Create route
app.post('/comments', function(req, res) {
    Comment.create(req.body.comment, function(err, newComment) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/comments');
        }
    });
});

// 9.4. Show route
app.get('/comments/:id', function(req, res) {
    Comment.findById(req.params.id, function(err, foundComment) {
        if(err) {
            console.log(err);
        } else {
            res.render('show', {comment: foundComment});
        }
    });
});

// 9.5. Edit route