const express = require('express');
const app = express();

//endpoint metodos get o post
app.get('/',(req, res) => {
    res.end("Bienvenidos al servidor Backend del grupo 9");
});

//rutas
const archivosDB = require('./conection.js');
const usuarios = require('./src/routes/usuariosRoutes.js');

//midleware
app.use(express.json());
app.use('/api', usuarios);

//listening
app.listen(5100,()=>{
    console.log("Servidor Node corriendo CORRECTAMENTE Grupo 9");
});
