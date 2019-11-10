const express = require('express');
require('dotenv/config');
//const mongoose = require('mongoose');
const postsRouter = require('./routes/postsRouter');
const usersRouter = require('./routes/usersRouter');
const path = require('path');
const exphbs = require('express-handlebars');
let db = require('./mongoConnection');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require('./models/User');

const app = express();

let Post = require('./models/post');

// Setar a view
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Bodyparser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.json())
app.use(bodyParser.json());
app.use(cookieParser());

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// ---------------------------------------------------
// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Local Strategy
let LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
    function(email, password, done){
    let query = {
        email: email
    }

    User.findOne(query, (err, user)=>{
        if(err) {
            throw err;
        }

        if(!user){
            return done(null, false, {
                message: 'Usuario nao encontrado'
            });
        }
        else{
            return done(null, user);
        }
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

//-------------------------------
// login users
app.post('/login',
  passport.authenticate('local', {
      failWithError: true
  }),
  function(req, res) {
    res.json(req.user);
  }
); 
app.get('/login', (req, res)=>{
    res.render('login_user');
})

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
app.use('/users', usersRouter);

// iniciando o servidor...
app.listen(port, ()=>{
    console.log(`Servidor iniciado na porta ${port}`);
});