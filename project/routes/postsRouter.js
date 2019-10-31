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

routes.get('/', (req, res) => {
    // GET todos os posts
    Post.find({}, (err, posts) => {
        if(err){
            console.log(err.message);
            return;
        }
        else{
            res.json(posts);
        }
    });
});

module.exports = routes;