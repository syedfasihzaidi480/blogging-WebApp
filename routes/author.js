const express = require("express");
const router = express.Router();

/**
 * @desc Displays a page to edit the article by author
 */
router.get("/edit-article", (req, res) => {
    try {
        if (!req.session.isLoggedIn) {
            res.redirect("/auth/login");
        }
        else {
            const query = "SELECT title, article_description, created, last_modified, published FROM articles WHERE id = ?";
            global.db.get(query, [req.query.article_id], function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.render("edit-article", {
                        article: result
                    });
                }  
            });
        }
    }
    catch {
        res.redirect("/auth/login");
    }
});


/**
 * @desc Updates the article by author
 */
router.post("/edit-article", (req, res) => {
    try {
        if (!req.session.isLoggedIn) {
            res.redirect("/auth/login");
        }
        else {
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const query = "UPDATE articles SET title = ?, article_description = ?, last_modified = ? WHERE id = ?";
            global.db.run(query, [req.body.title, req.body.description, date, req.query.article_id], function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/author");
                }
            });
        }
    }
    catch {
        res.redirect("/auth/login");
    }
});


/**
 * @desc Displays a page for author settings
 */
router.get("/settings", (req, res) => {
    try {
        if (!req.session.isLoggedIn) {
            res.redirect("/auth/login");
        }
        else {
            query = "SELECT title, author_name FROM articles WHERE id = ?";
            global.db.get(query, [req.query.article_id], function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("author-settings", {
                        blog: result
                    });
                }
            });
        }        
    }
    catch {
        res.redirect("/auth/login");
    }
});

/**
 * @desc Updates the article settings
 */
router.post("/settings", (req, res) => {
    try {
        if (!req.session.isLoggedIn) {
            res.redirect("/auth/login");
        }
        else {
            const { title, author_name} = req.body;
            const query = "UPDATE articles SET title = ?, author_name = ?, last_modified = ? WHERE id = ?";
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            
            global.db.run(query, [title, author_name, date, req.query.article_id], function (err) {
                if (err) {
                    console.error(err);
                } else {
                    res.redirect('/author');
                }
            });
        }
    }
    catch {
        res.redirect("/auth/login");
    }
});

/**
 * @desc Displays a home page for author
 */
router.get("/", (req, res) => {
    try {
        if (!req.session.isLoggedIn) {
            res.redirect("/auth/login");
        }
        else {
            const query = "SELECT * FROM articles";
            global.db.all(query, [], function (err, articles) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.render("author-home", {
                        article: articles
                    });
                }
            });       
        }
    }
    catch {
        res.redirect('/auth/login');
    } 
});


/**
 * @desc Displays a page to create a new article by author
 */
router.get("/new-draft", (req, res) => {
    try {
        if (!req.session.isLoggedIn) {
            res.redirect("/auth/login");
        }
        else {
            const query = "INSERT INTO articles (title, article_description, created, last_modified, author_name, likes, number_of_reads, published, article_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"; 
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
            global.db.run(query, [null, null, date, date, null, 0, 0, null, "Draft"], function(err) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.redirect("/author/edit-article?article_id=" + this.lastID);
                }
            });
        }
    }
    catch {
        res.redirect("/auth/login");
    }
});


/**
 * @desc Deletes the article by author
 */
router.get("/delete", (req, res) => {
    try {
        if (!req.session.isLoggedIn) {
            res.redirect("/auth/login");
        }
        else {
            const query = "DELETE FROM articles WHERE id = ?"; 
            global.db.run(query, [req.query.article_id], function(err) {
                if (err) {
                    console.log(err);
                }
                else {
                    const query = "DELETE FROM comments WHERE article_id = ?";
                    global.db.run(query, [req.query.article_id], function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.redirect("/author");
                        }
                    });
                }
            });
        }
    }
    catch {
        res.redirect("/auth/login");
    }
});


/**
 * @desc Displays a home page for author
 */
router.get("/publish", (req, res) => {
    try {
        if (!req.session.isLoggedIn) {
            res.redirect("/auth/login");
        }
        else {
            const query = "UPDATE articles SET article_status = 'Published', published = ? WHERE id = ?"; 
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
            global.db.run(query, [date, req.query.article_id], function(err) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.redirect("/author");
                }
            });
        }
    }
    catch {
        res.redirect("/auth/login");
    }
});
// Export the router object so index.js can access it
module.exports = router;