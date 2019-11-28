const express = require('express');
const routes = express.Router();
//const mongoose = require('mongoose');
let db = require('../mongoConnection');
let PostsController = require('../controller/PostsController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // error first callback
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {

        // error first callback
        /* cb(null, `${file.fieldname}-${req.body.title}-${Date.now()}.${path.extname(file.originalname)}`); */
        cb(null, `${req.body.title}${path.extname(file.originalname)}`);
        //cb(null, file.fieldname + '-' + Date.now())
    }
});

// utiliza a storage para configurar a instância do multer
const upload = multer({ storage });

// CREATE
routes.get('/create', PostsController.ensureAuthenticated, PostsController.createGet);
routes.post('/create', upload.single('file'), PostsController.createPost);

// READ ONLY
routes.get('/:id', PostsController.ensureAuthenticated, PostsController.readGet);

// UPDATE
routes.get('/edit/:id', PostsController.ensureAuthenticated,PostsController.updateGet);
routes.post('/edit/:id', PostsController.updatePost),

// DELETE
routes.get('/delete/:id', PostsController.ensureAuthenticated, PostsController.deleteGet),

module.exports = routes;