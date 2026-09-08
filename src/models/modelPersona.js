const poolDB = require('../config_db/config_mysql');

const listarPersonas = async () => {
    const db = "SELECT * FROM personas ORDER BY id_persona DESC";
    try {
        const [rows] = await poolDB.query(db)
        return rows
    } catch (error) {
        throw error;
    }
};

const listarUsuarios = async () => {
    const db = "SELECT * FROM usuarios";
    try {
        const [rows] = await poolDB.query(db)
        return rows
    } catch (error) {
        throw error;
    }
};
// Buscar persona por ID
const buscarPersonaId = async (idPersona) => {

    const sql = `SELECT * FROM personas WHERE id_persona = ? LIMIT 1`;

    try { 
        const [rows] = await poolDB.query(sql, [idPersona]);
        return rows.length > 0 ? rows[0]: null;

    } catch (error) {

        throw error;
    }
};
const buscarDocumento = async (documento, idPersona) => {

    const sql = `SELECT id_persona FROM personas WHERE documento = ? AND id_persona <> ? LIMIT 1`;

    try {

        const [rows] = await poolDB.query(
            sql,
            [
                documento,
                idPersona
            ]
        );
        return rows.length > 0 ? rows[0]: null;
    } catch (error) {

        throw error;
    }

};

const actualizarPersona = async (idPersona, datos) => {
    const sql = `UPDATE personas SET documento = ?, nombres = ?, apellidos = ?, telefono = ?, fecha_modificacion = CURDATE() WHERE id_persona = ?`;

    try {
        const [result] = await poolDB.query(
            sql,
            [
                datos.documento,
                datos.nombres,
                datos.apellidos,
                datos.telefono,
                idPersona
            ]
        );
        return result;
    } catch (error) {

        throw error;
    }

};

const buscarPersona = async (persona) => {

    const sql = `SELECT * FROM personas WHERE documento = ? LIMIT 1`;

    try {
        const [rows] = await poolDB.query(sql, [persona]);
        return rows.length > 0 ? rows[0] : null;
        
    } catch (error) {
        throw error;
    }
};
const buscarUsuario = async (usuario) => {

    const sql = `SELECT * FROM usuarios WHERE correo = ? LIMIT 1`;

    try {
        const [rows] = await poolDB.query(sql, [usuario]);
        return rows.length > 0 ? rows[0] : null;
        
    } catch (error) {
        throw error;
    }
};

const registrarPersona = async (datosPersona, datosUsuario) => {
    const conexion = await poolDB.getConnection();
    try {
        // Iniciamos la transacción
        await conexion.beginTransaction();

        const sqlPersona = `INSERT INTO personas (documento, nombres, apellidos, telefono, estado, fecha_modificacion)VALUES (?, ?, ?, ?, ?, ?)`;
        
        const [resPersona] = await conexion.query(sqlPersona,
            [
                datosPersona.documento,
                datosPersona.nombres,
                datosPersona.apellidos,
                datosPersona.telefono,
                datosPersona.estado,
                datosPersona.fecha
            ]
        );
        //Obtener id de la persona
        const id_persona = resPersona.insertId;

        //Insertar Usuario
        const sqlUsuario = `INSERT INTO usuarios(id_persona,id_rol, correo, password, estado, fecha_modificacion)VALUES (?, ?, ?, ?, ?, ?)`;

        const [resUsuario] = await conexion.query(sqlUsuario,
            [
                id_persona,
                datosUsuario.rol,
                datosUsuario.correo,
                datosUsuario.passwordHash,
                datosUsuario.estado,
                datosUsuario.fecha
            ]
        );
        //Confirmar la transaccion
        await conexion.commit();
        return {
            id_persona: id_persona,
            id_usuario: resUsuario.insertId
        };
    } catch (error) {
        // Si algo falla, deshacemos todo
        await conexion.rollback();
        throw error;
    } finally {
        // Liberamos la conexión
        conexion.release();
    }

};
module.exports = {
    listarPersonas,
    listarUsuarios,
    buscarPersonaId,
    buscarDocumento,
    buscarPersona,
    buscarUsuario,
    registrarPersona,
    actualizarPersona
}