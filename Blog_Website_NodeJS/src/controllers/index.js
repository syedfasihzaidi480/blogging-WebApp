// This file exports controller functions that handle the business logic for different routes in the application.

const UserController = require('./userController');
const ArticleController = require('./articleController');
const CommentController = require('./commentController');

module.exports = {
    UserController,
    ArticleController,
    CommentController
};