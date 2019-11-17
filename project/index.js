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
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');

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

app.use(flash());

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
            bcrypt.compare(password, user.password, (err, isMatch)=>{
                if(err){
                    console.log(err);
                }
                else{
                    if(isMatch){
                        return done(null, user);
                    }
                    else{
                        return done(null, false, {
                            message: 'Senha Invalida'
                        });
                    }
                }
            });

            //return done(null, user);
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
app.get('*', (req, res, next)=>{
    res.locals.user = req.user || null;
    next();
});

// login users
app.post('/login',
  passport.authenticate('local', {
      failWithError: true
  }),
  function(req, res) {
    //res.json(req.user);
    res.redirect('/');
  }
); 
app.get('/login', (req, res)=>{
    res.render('login_user');
})

app.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/login');
});

//app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    Post.find({}, (err, posts) => {
        if(err){
            console.log(err.message);
            return;
        }
        else{
            //req.flash('msg1', 'hate');
            if(req.query.valid === 'success' || req.query.valid === 'danger'){
                let string = req.query.valid;
                console.log(string);

                if(string === 'success'){
                    res.render('index', {
                        data: posts,
                        string,
                        info: {
                            type: string,
                            message: 'Post Adicionado com sucesso'
                        }
                    });
                }
                else{
                    res.render('index', {
                        data: posts,
                        string,
                        info: {
                            type: string,
                            message: 'Erro ao adicionar o post'
                        }
                    });
                }
                
            }
            else{
                console.log('no string');

                res.render('index', {
                    data: posts
                });
            }
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