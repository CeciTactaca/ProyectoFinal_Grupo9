console.log("Archivo de rutas cargado correctamente");

const express = require('express');
const routes = express.Router();

//modelo de datos
const mongoose = require('mongoose');
const esquema = mongoose.Schema;

const esquemaUsuario = new esquema({
    username: String,
    password: String,
    rol: String,
    name: String
});

const listaUsuarios = mongoose.model('users', esquemaUsuario);
 
//ruta GET
routes.get('/obtenerUsuario', async (req, res) => {
    try{
        const docs = await listaUsuarios.find();
        res.send(docs);

    }catch (error){
        console.error("Error al obtener usuario", error);
        res.status(500).send({ message: "Error interno del servidor al obtener usuarios", error: error})
    }
});


module.exports = routes;