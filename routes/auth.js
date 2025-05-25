const express = require("express");
const router = express.Router();

/**
 * @desc Displays a page with a form for registering a user 
 */
router.get("/register", (req, res) => {
    res.render("register", { issue: null });
});

/**
 * @desc Displays a page with a form for logging in a user 
 */
router.get("/login", (req, res) => {
    res.render("login", { user_exist: false });
});

/**
 * @desc Logs out the user by clearing the session   
 */
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/auth/login');
        }
      });
});

/**
 * @desc Register a new user
 */
router.post("/register", (req, res, next) => {
    query = "SELECT * FROM users WHERE (username = ?)";
    query_parameters = [req.body.username];
    
    global.db.get(query, query_parameters, function (err, row) {
            if (err) {
                next(err); //send the error on to the error handler
            } else {
                if (row) {
                    res.render("register", { issue: "username" });
                } else {
                    // If no user exists, proceed with inserting the new user
                    const insertQuery = "INSERT INTO users (first_name, last_name, email, username, password) VALUES (?, ?, ?, ?, ?);";
                    const insertParams = [req.body.firstName, req.body.lastName, req.body.emailField, req.body.username, req.body.passwordField];

                    global.db.run(insertQuery, insertParams, function (err) {
                        if (err) {
                            // Send the error on to the error handler
                            next(err);
                        } else {
                            // Redirect to the login page upon successful registration
                            res.redirect("/auth/login");
                        }
                    });
                }
            }
        }
    );
});

/**
 * @desc Log in a user
 */
router.post("/login", (req, res) => {
    // Define the query to check if the username exists
    const checkUserQuery = "SELECT * FROM users WHERE username = ?";
    const checkUserParams = [req.body.username];

    // Execute the query to check for existing username
    global.db.get(checkUserQuery, checkUserParams, (err, row) => {
        if (err) {
            // Handle the error, possibly render the login page with an error message
            res.render("login", { user_exist: false });
        } else if (row) {
            // If a user with the same username exists, check if the password matches
            if (row.password === req.body.password) {
                
                req.session.isLoggedIn = true;
                req.session.username = req.body.username;

                // If the password matches, redirect the user to the home page
                res.redirect("/author");
            } else {
                // If the password does not match, inform the user
                res.render("login", { user_exist: true });
            }
        } else {
            // If no user exists with the provided username, inform the user
            res.render("login", { user_exist: false });
        }
    });
});

// Export the router object so index.js can access it
module.exports = router;