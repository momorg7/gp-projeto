const express = require('express');
require('dotenv/config');
//const mongoose = require('mongoose');
const postsRouter = require('./routes/postsRouter');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
let db = require('./mongoConnection');

const app = express();

let Post = require('./models/post');

// Setar a view
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Bodyparser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    Post.find({}, (err, posts) => {
        if(err){
            console.log(err.message);
            return;
        }
        else{
            res.render('index', {
                data: posts
            });
        }
    });
});

const port = process.env.PORT || 3000;

app.use('/posts', postsRouter);

// iniciando o servidor...
app.listen(port, ()=>{
    console.log(`Servidor iniciado na porta ${port}`);
});