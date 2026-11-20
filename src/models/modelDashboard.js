const poolDB = require('../config_db/config_mysql');

const obtenerResumen = async () => {

    const [
        [personas],
        [certificados],
        [mensajes],
        [usuarios],
        [ultimosMensajes],
        [ultimosCertificados]
    ] = await Promise.all([

        poolDB.query(`
            SELECT COUNT(*) AS total
            FROM personas
        `),

        poolDB.query(`
            SELECT COUNT(*) AS total
            FROM certificados
        `),

        poolDB.query(`
            SELECT COUNT(*) AS total
            FROM mensajes
            WHERE estado = 'pendiente'
        `),

        poolDB.query(`
            SELECT COUNT(*) AS total
            FROM usuarios
        `),

        poolDB.query(`
            SELECT
                m.id_mensaje,
                p.nombres,
                p.apellidos,
                p.correo,
                m.asunto,
                m.fecha_modificacion
            FROM mensajes AS m
            INNER JOIN personas AS p
                ON m.id_persona = p.id_persona
            ORDER BY m.fecha_modificacion DESC,
                     m.id_mensaje DESC
            LIMIT 5
        `),

        poolDB.query(`
            SELECT
                c.id_certificado,
                c.codigo,
                c.titulo,
                c.fecha_modificacion,
                p.nombres,
                p.apellidos
            FROM certificados AS c
            INNER JOIN personas AS p
                ON c.id_persona = p.id_persona
            ORDER BY c.fecha_modificacion DESC,
                     c.id_certificado DESC
            LIMIT 5
        `)

    ]);

    return {
        totalPersonas: personas[0].total,
        totalCertificados: certificados[0].total,
        mensajesPendientes: mensajes[0].total,
        totalUsuarios: usuarios[0].total,
        ultimosMensajes,
        ultimosCertificados,
    };
};

module.exports = {
    obtenerResumen
};