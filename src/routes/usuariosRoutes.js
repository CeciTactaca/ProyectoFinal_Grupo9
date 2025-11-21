const express = require('express');
const router = express.Router();

const usuarioModel = require('../model/usuarios.js');

//GET para pedir los usuarios de la BD
router.get('/obtenerUsuario', async (req, res) => {
    try {
        const docs = await usuarioModel.find();
        res.send(docs);

    } catch (error) {
        console.error("Error al obtener usuario", error);
        res.status(500).send({ message: "Error interno del servidor al obtener usuarios", error: error })
    }
});

//POST crea un nuevo usuario
router.post('/registrarUsuario', async (req, res) => {
    try {
        console.log("REQ BODY:", req.body);
        
        const nuevoUsuario = new usuarioModel(req.body);
        const datosGuardados = await nuevoUsuario.save();

        //respuesta exitosa
        res.status(201).json({ success: true, data: datosGuardados });
        console.log(res.message);
    } catch (error) {
        console.error("Error en /registrarUsuario", error);
        res.status(500).json({ success: false, message: "Error interno del servidor al registrar usuario", error: error });
    }
});

//Para cambiar el puntaje
router.put('/:id/puntaje', async (req, res) => {
  try {
    console.log('PUT recibido:', req.params.id,'puntaje', req.body.puntaje);
    const { puntajes, puntajeTotal } = req.body;
    const user = await usuarioModel.findByIdAndUpdate(
      req.params.id,
      { puntajes, puntajeTotal },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;