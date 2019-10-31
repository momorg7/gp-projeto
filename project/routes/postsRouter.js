const express = require('express');
const routes = express.Router();
//const mongoose = require('mongoose');
let Post = require('../models/post');
let db = require('../mongoConnection');

/* mongoose.connect('mongodb://localhost/postsDatabase');
let db = mongoose.connection;

db.once('open', ()=>{
    console.log('Conectado ao Mongodb');
});

db.on('error', (err)=>{
    console.log(err);
}); */

routes.get('/add', (req, res) => {
    // GET todos os posts
    Post.find({}, (err, posts) => {
        if(err){
            console.log(err.message);
            return;
        }
        else{
            res.render('create_post');
            //res.json(posts);
        }
    });
});

routes.post('/add', (req, res)=>{
    let post = new Post();

    post.title = req.body.title;
    post.author = req.body.author;
    post.body = req.body.body;

    post.save((err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    });


});

module.exports = routes;