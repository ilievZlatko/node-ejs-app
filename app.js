const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb://localhost/nodekb');
const db = mongoose.connection;

app.use(express.static(__dirname + '/assets'));

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Home Route
app.get('/', (req, res) => {
    let articles = [
        {
            id: 1,
            title: 'Article One',
            author: 'John Doe',
            body: 'This is Article One'
        },
        {
            id: 2,
            title: 'Article Two',
            author: 'John Doe',
            body: 'This is Article Two'
        },
        {
            id: 3,
            title: 'Article Three',
            author: 'Philip Baker',
            body: 'This is Article Three'
        }
    ];
    res.render('index', { title: 'Hello', articles: articles });
});

app.get('/articles/add', (req, res) => {
    res.render('add_article', { title: 'Add Article' });
});

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});
