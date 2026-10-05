const model = require('../models/modelMensaje');

const registrarMensaje = async (req, res) => {

    try {
        const { documento, nombres,telefono, correo, asunto } = req.body;

        if (!documento || !nombres || !telefono || !correo || !asunto) {

            return res.status(400).json({
                ok: false,
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!regexCorreo.test(correo)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El correo ingresado no es válido'
            });
        }
        let contacto = {
            documento, 
            nombres, 
            telefono, 
            correo, 
            asunto,
            estado : 'activo',
            fecha: new Date()
        }

        await model.registrarMensaje(contacto);

        return res.status(201).json({
            ok: true,
            mensaje:'Su mensaje fue enviado correctamente',

            data : {id_mensaje: contacto.id_mensaje}       
        });


    } catch (error) {

        console.error('Error registrando mensaje:', error);

        return res.status(500).json({
            ok: false,
            mensaje:'Ocurrió un error al enviar el mensaje'

        });

    }

};

const listarMensajes = async (req, res) => {
  try {
    const mensajes = await model.listarMensajes();
    console.log(mensajes);
    
    res.json(mensajes); //Empaquetamos en formato json para enviar a router
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const eliminarMensaje = async (req, res) => {

    try {

        const { idMensaje } = req.params;

        if (!idMensaje) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El ID del mensaje es obligatorio'
            });

        }

        // Elimina
        const resultado = await model.eliminarMensaje(idMensaje);


        // Verifica si existia
        if (resultado.affectedRows === 0) {

            return res.status(404).json({

                ok: false,
                mensaje: 'El mensaje no existe'

            });

        }

        return res.json({
            ok: true,
            mensaje: 'Mensaje eliminado correctamente'
        });


    } catch (error) {

        console.error('Error al eliminar mensaje:', error);

        return res.status(500).json({
            ok: false,
            mensaje: 'Error al eliminar el mensaje'
        });
    }
};

module.exports = {
    registrarMensaje,
    listarMensajes,
    eliminarMensaje
};