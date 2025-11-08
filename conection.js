const mongoose = require('mongoose');
mongoose.connect

    ("mongodb+srv://matias:matias10@cluster0.jrcwjzo.mongodb.net/tudivj?appName=Cluster0");

const objeto = mongoose.connection;

objeto.on('connected', () => {
    console.log("Conectado a la base de datos del grupo 9");
});

objeto.on('error', () => {
    console.log("Se produjo un error en la conexion con Mongo DB");
});

module.exports = mongoose;