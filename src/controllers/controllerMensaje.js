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
        const resultado = await model.registrarMensaje({documento, nombres, telefono, correo, asunto});

        return res.status(201).json({
            ok: true,
            mensaje:'Su mensaje fue enviado correctamente',

            data : {id_mensaje: resultado.id_mensaje}       
        });


    } catch (error) {

        console.error('Error registrando mensaje:', error);

        return res.status(500).json({
            ok: false,
            mensaje:'Ocurrió un error al enviar el mensaje'

        });

    }

};


module.exports = {
    registrarMensaje
};