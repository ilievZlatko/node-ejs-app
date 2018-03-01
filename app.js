const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();

// Import Models
const Article = require('./models/article');

mongoose.connect('mongodb://localhost/nodekb');
const db = mongoose.connection;

// Check connection
db.once('open', () => {
    console.log('connected to MongoDB');
});

// Check for DB errors
db.on('error', err => {
    console.log(err);
});

app.use(express.static(__dirname + '/assets'));

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Home Route
app.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { title: 'Articles', articles: articles });
        }
    });
});

app.get('/articles/add', (req, res) => {
    res.render('add_article', { title: 'Add Article' });
});

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});
