const poolDB = require('../config_db/config_mysql');

/* Listado general de certificados */
const listarCertificadosGlobal= async () => {
    const db = "SELECT * FROM certificados";
    try {
        const [rows] = await poolDB.query(db)
        return rows
    } catch (error) {
        throw error;
    }
};



/* Buscar un certificado especifico por persona*/
const listarCertificadosPorPersona = async (idPersona) => {

    const sql = `
        SELECT
            id_certificado,
            id_persona,
            codigo,
            titulo,
            descripcion,
            url_pdf,
            estado,
            fecha_modificacion
        FROM certificados
        WHERE id_persona = ?
        ORDER BY id_certificado DESC
    `;
    

    try {

        const [rows] = await poolDB.query(sql,[idPersona]);
        return rows;

    } catch (error) {

        throw error;
    }

};

// Registrar Certificado
const registrarCertificado = async (datos) => {

    const sql = `
        INSERT INTO certificados (id_persona, codigo, titulo, descripcion, url_pdf, estado, fecha_modificacion) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    try {
        const [result] = await poolDB.query(sql,
            [
                datos.id_persona,
                datos.codigo,
                datos.titulo,
                datos.descripcion,
                datos.url_pdf,
                datos.estado,
                datos.fecha_modificacion
            ]
        );
        return result;

    } catch (error) {

        throw error;
    }
};


// ======================================================
// Obtener Certificado por ID

const buscarCertificadoPorId = async (idCertificado) => {

    const sql = ` SELECT * FROM certificados WHERE id_certificado = ? LIMIT 1`;
    try {
        const [rows] = await poolDB.query(sql, [idCertificado]);

        return rows.length > 0 ? rows[0] : null;

    } catch (error) {

        throw error;
    }

};

/* Buscar un certificado especifico */
const buscarCertificadoPorCodigo = async (codigo) => {

    const db = `SELECT * FROM certificados WHERE codigo = ? LIMIT 1`;

    try {
        const [rows] = await poolDB.query(db, [codigo]);
        return rows.length > 0 ? rows[0] : null;

    } catch (error) {

        throw error;

    }
};
// Actualizar CErtificado
const actualizarCertificado = async (idCertificado, datos) => {
    const sql = `UPDATE certificados SET 
    codigo = ?, 
    titulo = ?, 
    descripcion = ?, 
    url_pdf = ?, 
    estado = ?, 
    fecha_modificacion = CURDATE() 
    WHERE id_certificado = ?`;

    try {

        const [result] = await poolDB.query(
            sql,
            [
                datos.codigo,
                datos.titulo,
                datos.descripcion,
                datos.url_pdf,
                datos.estado,
                idCertificado
            ]
        );

        return result;

    } catch (error) {

        throw error;
    }

};
// Eliminar Certificado
const eliminarCertificado = async (idCertificado) => {

    const sql = `DELETE FROM certificados WHERE id_certificado = ?`;

    try {

        const [result] = await poolDB.query(sql, [idCertificado]);
        return result;

    } catch (error) {

        throw error;
    }

};


module.exports = {

    listarCertificadosGlobal,
    listarCertificadosPorPersona,
    buscarCertificadoPorCodigo,
    buscarCertificadoPorId,
    registrarCertificado,
    actualizarCertificado,
    eliminarCertificado

};