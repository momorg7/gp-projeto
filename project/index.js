const express = require('express')
require('dotenv/config')
const mongoose = require('mongoose');

const app = express()

mongoose.connect('mongodb://localhost/postsDatabase');
let db = mongoose.connection;

db.once('open', ()=>{
    console.log('Conectado ao Mongodb');
});

db.on('error', (err)=>{
    console.log(err);
});

app.get('/', (req, res) => {
    res.json('oiii')
});

const port = process.env.PORT || 3000;

// iniciando o servidor...
app.listen(port, ()=>{
    console.log(`Servidor iniciado na porta ${port}`)
});