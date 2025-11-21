//modelo de datos
const mongoose = require('mongoose');
const esquema = mongoose.Schema;

const esquemaUsuario = new esquema({
    nombre: String,
    apellido: String,
    fechaNacimiento: {
        type: Date,
        required: true
    },
    estado: Boolean,
    username: String,
    password: String,
    rol: String,
    puntajes: {
        colores: Number,
        animales: Number,
        numeros: Number,
        verbos: Number
    },
    puntajeTotal: Number
});

module.exports = mongoose.model('users', esquemaUsuario);
