const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

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

// Add Route
app.get('/articles/add', (req, res) => {
    res.render('add_article', { title: 'Add Article' });
});

// Add Submit POST Route
app.post('/articles/add', (req, res) => {
    const article = Object.assign(new Article(), req.body);

    article.save(err => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

// Get single article
app.get('/article/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render('article', { article });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});
