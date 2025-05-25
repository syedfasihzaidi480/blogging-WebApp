
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- Create your tables with SQL commands here (watch out for slight syntactical differences with SQLite vs MySQL)

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

-- Insert default data (if necessary here)



COMMIT;

