const poolDB = require('../config_db/config_mysql');

/* Listado general de certificados */
const listarCertificados= async () => {
    const db = "SELECT * FROM certificados";
    try {
        const [rows] = await poolDB.query(db)
        return rows
    } catch (error) {
        throw error;
    }
};

/* Buscar un certificado especifico */
const buscarCertificado = async (codigo) => {

    const db = `SELECT * FROM certificados WHERE codigo = ? LIMIT 1`;

    try {
        const [rows] = await poolDB.query(db, [codigo]);
        return rows.length > 0 ? rows[0] : null;

    } catch (error) {

        throw error;

    }
};



module.exports = {
    listarCertificados,
    buscarCertificado
}