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

            const sqlActualizarPersona = `UPDATE personas SET nombres = ?, telefono = ?, correo = ?, fecha_modificacion = NOW() WHERE id_persona = ?`;

            await conexion.query(sqlActualizarPersona, [datos.nombres, datos.telefono, datos.correo, idPersona]);

        }

        // Si la persona no existe
        else {

            const sqlRegistrarPersona = `INSERT INTO personas (documento, nombres, telefono, correo, fecha_modificacion) VALUES (?, ?, ?, ?, NOW())`;

            const [resultadoPersona] = await conexion.query(sqlRegistrarPersona, [datos.documento, datos.nombres, datos.telefono, datos.correo]);

            idPersona = resultadoPersona.insertId;
        }

        // Registrar mensaje
        const sqlRegistrarMensaje = `INSERT INTO mensajes (id_persona, asunto, estado, fecha_modificacion) VALUES (?, ?, ?, NOW())`;


        const [resultadoMensaje] = await conexion.query( sqlRegistrarMensaje, [idPersona, datos.asunto, 'pendiente']);

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


module.exports = {

    registrarMensaje

};