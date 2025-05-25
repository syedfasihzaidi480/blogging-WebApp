/**
* index.js
* This is your main app entry point
*/

// Set up express, bodyparser and EJS
const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set the app to use ejs for rendering
app.use(express.static(__dirname + '/public')); // set location of static files
var session = require('express-session')
require('dotenv').config();

app.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

// Set up SQLite
// Items in the global namespace are accessible throught out the node application
const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('./database.db',function(err){
    if(err){
        console.error(err);
        process.exit(1); // bail out we can't connect to the DB
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
    }
});

// Handle requests to the home page 
app.get('/', (req, res) => {
    res.render('main-page.ejs');
});

// Add all the route handlers in usersRoutes to the app under the path /users
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

// Add all the route handlers in authRoutes to the app under the path /auth
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Add all the route handlers in authorRoutes to the app under the path /author
const authorRoutes = require('./routes/author');
app.use('/author', authorRoutes);

// Add all the route handlers in readerRoutes to the app under the path /reader
const readerRoutes = require('./routes/reader');
app.use('/reader', readerRoutes);


// Make the web application listen for HTTP requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

