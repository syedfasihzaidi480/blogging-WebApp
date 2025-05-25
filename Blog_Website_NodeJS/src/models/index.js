// This file defines the data models and interacts with the database, including schema definitions and queries.

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the SQLite database
const db = new sqlite3.Database(path.resolve(__dirname, '../../database.db'), (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Function to create tables
const createTables = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            first_name TEXT,
            last_name TEXT,
            email TEXT,
            username TEXT PRIMARY KEY,
            password TEXT
        );
        
        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            article_description TEXT,
            created DATE,
            last_modified DATE,
            author_name TEXT,
            reactions INTEGER DEFAULT 0,
            number_of_reads INTEGER DEFAULT 0,
            published DATE,
            likes INTEGER DEFAULT 0,
            loves INTEGER DEFAULT 0,
            hahas INTEGER DEFAULT 0,
            wows INTEGER DEFAULT 0,
            sads INTEGER DEFAULT 0,
            angrys INTEGER DEFAULT 0,
            article_status TEXT CHECK(article_status IN ('Draft', 'Published'))
        );

        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            article_id INTEGER,
            comment TEXT,
            commenter_name TEXT,
            comment_date DATE,
            FOREIGN KEY (article_id) REFERENCES articles(id)
        );
    `;

    db.exec(sql, (err) => {
        if (err) {
            console.error('Error creating tables: ' + err.message);
        } else {
            console.log('Tables created successfully.');
        }
    });
};

// Call the function to create tables
createTables();

// Export the database connection
module.exports = db;