const poolDB = require('../config_db/config_mysql');


// ==========================================
// OBTENER DATOS DEL USUARIO AUTENTICADO
// ==========================================

const obtenerMiPerfil = async (idUsuario) => {

    const sql = `
        SELECT
            u.id_usuario,
            u.usuario,
            p.id_persona,
            p.documento,
            p.nombres,
            p.apellidos,
            p.telefono,
            p.direccion,
            p.correo

        FROM usuarios AS u

        INNER JOIN personas AS p
            ON u.id_persona = p.id_persona

        WHERE u.id_usuario = ?

        LIMIT 1
    `;

    const [rows] = await poolDB.query(sql, [idUsuario]);

    return rows[0] || null;
};


// ==========================================
// ACTUALIZAR DATOS PERSONALES
// ==========================================

const actualizarMiPerfil = async (idUsuario, datos) => {

    const sql = `
        UPDATE personas AS p

        INNER JOIN usuarios AS u
            ON p.id_persona = u.id_persona

        SET
            p.documento = ?,
            p.nombres = ?,
            p.apellidos = ?,
            p.telefono = ?,
            p.direccion = ?,
            p.fecha_modificacion = NOW()

        WHERE u.id_usuario = ?
    `;

    const [resultado] = await poolDB.query(sql, [
        datos.documento,
        datos.nombres,
        datos.apellidos,
        datos.telefono,
        datos.direccion,
        idUsuario
    ]);

    return resultado;
};


module.exports = {
    obtenerMiPerfil,
    actualizarMiPerfil
};