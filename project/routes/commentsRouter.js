const express = require('express');
const routes = express.Router();
let Comment = require('../models/Comment');
let CommentsController = require('../controller/CommentsController');

routes.post('/create', CommentsController.createPost);

module.exports = routes;