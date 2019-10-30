const express = require('express')
require('dotenv/config')
const app = express()

app.get('/', (req, res) => {
    res.json('oiii')
});

const port = process.env.PORT || 3000;

// iniciando o servidor...
app.listen(port, ()=>{
    console.log(`Servidor iniciado na porta ${port}`)
});