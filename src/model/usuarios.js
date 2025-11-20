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
    puntaje: Number
});

module.exports = mongoose.model('users', esquemaUsuario);
