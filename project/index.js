const express = require('express');
require('dotenv/config');
//const mongoose = require('mongoose');
const postsRouter = require('./routes/postsRouter');
const usersRouter = require('./routes/usersRouter');
const commentsRouter = require('./routes/commentsRouter');

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
const multer = require('multer');
const fs = require('fs');
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

// upload videos multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //cb(null, 'uploads/')
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });
app.use(express.static('public'));

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

// upload videos multer
app.get('/file/upload', (req, res)=>{
    res.render('upload_video')
});

app.post('/file/upload', upload.single('file'), 
    (req, res) => res.send('<h2>Upload realizado com sucesso</h2>'));

app.get('/video/:id', function(req, res) {
    //const path = "uploads/file-1574683442970.mp4";
    //const path = "uploads/"+req.params.id+".mp4";
    const path = "public/"+req.params.id+".mp4";
    console.log(path)
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
        const chunksize = (end-start)+1
        const file = fs.createReadStream(path, {start, end})
        const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }
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
            /* console.log(err.message);
            return; */
            let string = req.query.valid;
            //console.log(string);
            let type = string.slice(0, 6);
            let message = string.slice(6, string.length);

            console.log(type);
            console.log(message);

            res.render('index', {
                data: posts,
                string,
                info: {
                    type,
                    message
                }
            });
        }
        else{
            //req.flash('msg1', 'hate');
            if(req.query.valid){
                //console.log(req.query.valid);
                let string = req.query.valid;
                //console.log(string);
                let type = string.slice(0, 7);
                let message = string.slice(7, string.length);

                //console.log(type);
                //console.log(message);

                res.render('index', {
                    data: posts,
                    string,
                    info: {
                        type,
                        message
                    }
                });
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
//console.log(process.env.admin);

app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

// iniciando o servidor...
app.listen(port, ()=>{
    console.log(`Servidor iniciado na porta ${port}`);
});