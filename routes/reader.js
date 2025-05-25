const express = require("express");
const router = express.Router();


/**
 * @desc Displays a home page for reader
 */
router.get("", (req, res, next) => {
    const query = "SELECT * FROM articles WHERE article_status = 'Published' ORDER BY published DESC";

    global.db.all(query, [], (err, articles) => {
        if (err) {
            next(err);
        } else {
            res.render("reader-home", { article: articles, user: req.session.username });
        }
    });
});


/**
 * @desc Reacts to an article by reader 
 */
router.post("/article/react/:article_id", (req, res, next) => {
    const reaction = req.body.reaction + 's'; 

    // Use CASE statement to safely increment the correct reaction column
    const query = `UPDATE articles SET reactions = reactions + 1, 
                   ${reaction} = CASE WHEN id = ? THEN ${reaction} + 1 ELSE ${reaction} END 
                   WHERE id = ?`;

    global.db.run(query, [req.params.article_id, req.params.article_id], function(err) {
        if (err) {
            next(err);
        } else {
            res.redirect("/reader/articles?article_id=" + req.params.article_id);
        }
    });
});


/**
 * @desc Displays an article clicked by reader
 */
router.get("/articles", (req, res, next) => {
    const query = "SELECT * FROM articles WHERE id = ?";

    global.db.get(query, [req.query.article_id], (err, article) => {
        if (err) {
            next(err);
        } else {
            const query = "UPDATE articles SET number_of_reads = number_of_reads + 1 WHERE id = ?";
            global.db.run(query, [req.query.article_id], function (err, result) {
                if (err) {
                    next(err);
                }
                else {
                    const query = "SELECT * FROM comments WHERE article_id = ? ORDER BY comment_date DESC";
                    global.db.all(query, [req.query.article_id], (err, comments) => {
                        if (err) {
                            next(err);
                        } else {
                            res.render("reader-article", { article: article, comments: comments, user: req.session.username });
                        }
                    });
                }
            });
        }
    });
});


/**
 * @desc Submits a form to add a comment to an article
 */
router.post("/article/add_comment/:article_id", (req, res, next) => {
    const query = "INSERT INTO comments (article_id, comment, commenter_name, comment_date) VALUES (?, ?, ?, ?)";
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    global.db.run(query, [req.params.article_id, req.body.comment, req.body.commenter_name, date], (err) => {
        if (err) {
            next(err);
        } else {
            res.redirect("/reader/articles/?article_id=" + req.params.article_id);
        }
    });
});


// Export the router object so index.js can access it
module.exports = router;