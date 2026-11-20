const model = require('../models/modelConfiguracion');

// CONSULTAR MI PERFIL
const obtenerMiPerfil = async (req, res) => {

    try {
        const idUsuario = req.usuario.id;
        const perfil = await model.obtenerMiPerfil(idUsuario);
        if (!perfil) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se encontró el perfil'
            });
        }

        return res.json({
            ok: true,
            data: perfil
        });

    } catch (error) {

        console.error(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener el perfil'
        });
    }
};

// ==========================================
// ACTUALIZAR MI PERFIL
// ==========================================

const actualizarMiPerfil = async (req, res) => {

    try {

        const idUsuario = req.usuario.id;

        const {
            documento,
            nombres,
            apellidos,
            telefono,
            direccion
        } = req.body;

        // Validar campos
        if (!documento, !nombres, !apellidos, !telefono) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se permiten Campos vacios'
            });
        }

        // Limpiar datos
        const datos = {
            documento: documento.trim(),
            nombres: nombres.trim(),
            apellidos: apellidos.trim(),
            telefono: telefono.trim(),
            direccion: direccion.trim()
        };

        // Verificar que existe el perfil
        const perfil = await model.obtenerMiPerfil(idUsuario);

        if (!perfil) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se encontró el perfil del usuario'
            });
        }

        // Actualizar
        await model.actualizarMiPerfil(idUsuario, datos);

        // Consultar datos actualizados
        const perfilActualizado = await model.obtenerMiPerfil(idUsuario);

        return res.status(200).json({
            ok: true,
            mensaje: 'Datos actualizados correctamente',
            data: perfilActualizado
        });

    } catch (error) {

        console.error('Error al actualizar perfil:', error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                ok: false,
                mensaje: 'El documento ingresado ya está registrado'
            });
        }

        return res.status(500).json({
            ok: false,
            mensaje: 'Error al actualizar los datos personales'
        });
    }
};


module.exports = {
    obtenerMiPerfil,
    actualizarMiPerfil
};