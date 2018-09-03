"use strict";
var cookieParser = require('cookie-parser');
var express = require('express');
var cors = require('cores');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// Create modular routing
const router = express.Router();

// use middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// connect to mongoDB with URL. TODO: Set up MongoDB instance to connect to
mongoose.connect('');

const connection = mongoose.connection;

// Event listener for opening connection to DB
connection.once('open', () => {
    console.log('Connection to MongoDB has been established successfully');
});

app.use('/', router);

// Route to set cookie
app.get('/cookies', (req, res) => {
    var cookie_name = 'login';
    res.cookie(cookie_name, 'cookie_value', {maxAge: 9999999}).send('cookie is set');
});

// Route to clear cookies
app.get('/clearcookies', (req, res) => {
    res.clearCookie('login');
    res.send('cookie deleted');
});

// Event listener
app.listen(3000, () => {
    console.log('Listening on port 3000');
});