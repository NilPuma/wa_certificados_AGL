const bcrypt = require('bcryptjs');
const model = require('../models/modelPersona');

/* const app = require('../../app.js');
const server = app.listen(app.get('port')); */
//Websockets
/* const socketIO = require('socket.io');
const io = socketIO(server); */

/* io.of('/index').on('connection', async(socket)=>{
    try {
        const usuarios = await model.listarUsuarios();
        io.of('/index').to(socket.id).emit('/index/listarUsuarios', usuarios);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
    
}); */

// RUTA PARA LA API (JSON)
const listarPersonas = async (req, res) => {
  try {
    const personas = await model.listarPersonas();
    res.json(personas); //Empaquetamos en formato json para enviar a router
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await model.listarUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const registrarUsuario = async (req, res) => {
  try {
    const {documento, nombres, apellidos, telefono, correo, password } = req.body;

    //Validar datos
    if (!documento || !nombres || !telefono || !correo || !password ) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Todos los campos son obligatorios...'
      });
    }
    //Verificar si el usuario ya existe
    const personaExiste = await model.buscarPersona(documento);
    const usuarioExiste = await model.buscarUsuario(correo);
    if (personaExiste) {
      return res.status(409).json({
        ok: false,
        mensaje: 'La persona ya se encuentra registrado...'
      });
    }
    if (usuarioExiste) {
      return res.status(409).json({
        ok: false,
        mensaje: 'El correo ya se esta usando, ingrese uno diferente...'
      });
    }
    //Encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 10);
    let persona ={
      documento, 
      nombres, 
      apellidos, 
      telefono, 
      estado: 'activo',
      fecha :new Date(),
    }
    let usuario ={
      rol : 2,
      correo,
      passwordHash,
      estado : 'activo',
      fecha: new Date()
    }

    //Guardar usuario
    await model.registrarUsuario(persona, usuario);

    // Respuesta
    return res.status(201).json({
      ok: true,
      mensaje: 'Usuario registrado correctamente...'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      mensaje: 'Error interno del servidor...'
    });
  }
};

module.exports = {
  listarPersonas,
  listarUsuarios,
  registrarUsuario
};
