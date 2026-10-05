const poolDB = require('../config_db/config_mysql');

const registrarMensaje = async (datos) => {

    // Obtener una conexión del pool
    const conexion = await poolDB.getConnection();


    try {
        
        await conexion.beginTransaction();

        const sql = ` SELECT id_persona,documento, nombres, telefono, correo FROM personas WHERE documento = ? LIMIT 1`;

        const [personas] = await conexion.query(sql, [datos.documento]);
        let idPersona;

        // PERSONA YA EXISTE
        
        if (personas.length > 0) {

            idPersona = personas[0].id_persona;
            // Opcional:
            // actualizar nombre y teléfono
            // por si la persona los cambió

            const sqlActualizarPersona = `UPDATE personas SET nombres = ?, telefono = ?, correo = ?, fecha_modificacion = ? WHERE id_persona = ?`;

            await conexion.query(sqlActualizarPersona, [datos.nombres, datos.telefono, datos.correo, datos.fecha, idPersona]);

        }

        // Si la persona no existe
        else {

            const sqlRegistrarPersona = `INSERT INTO personas (documento, nombres, telefono, correo, estado, fecha_modificacion) VALUES (?, ?, ?, ?, ?, ?)`;

            const [resultadoPersona] = await conexion.query(sqlRegistrarPersona, [datos.documento, datos.nombres, datos.telefono, datos.correo, datos.estado, datos.fecha]);

            idPersona = resultadoPersona.insertId;
        }

        // Registrar mensaje
        const sqlRegistrarMensaje = `INSERT INTO mensajes (id_persona, asunto, estado, fecha_modificacion) VALUES (?, ?, ?, ?)`;


        const [resultadoMensaje] = await conexion.query( sqlRegistrarMensaje, [idPersona, datos.asunto, 'pendiente', datos.fecha]);

        // Confirma la transaccion 
        await conexion.commit();
        return {
            id_mensaje: resultadoMensaje.insertId, 
            id_persona: idPersona
        };

    } catch (error) {

        // desace todo si algo no sale bien.
        await conexion.rollback();
        throw error;
    } finally {

        // devolvemos la conexion al pool
        conexion.release();
    }

};

const listarMensajes = async () => {
    const db = `
        SELECT
            m.id_mensaje,
            m.id_persona,
            m.asunto,
            m.estado,
            m.fecha_modificacion,

            p.documento,
            p.nombres,
            p.apellidos,
            p.telefono,
            p.correo

        FROM mensajes AS m

        INNER JOIN personas AS p
            ON m.id_persona = p.id_persona

        ORDER BY m.fecha_modificacion DESC
    `;
    try {
        const [rows] = await poolDB.query(db)
        return rows
    } catch (error) {
        throw error;
    }
};

const eliminarMensaje = async (idMensaje) => {

    const sql = `DELETE FROM mensajes WHERE id_mensaje = ?`;

    try {
        const [resultado] = await poolDB.query(sql, [idMensaje]);
        return resultado;

    } catch (error) {

        throw error;

    }

};


module.exports = {

    registrarMensaje,
    listarMensajes,
    eliminarMensaje

};