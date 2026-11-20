const model = require('../models/modelDashboard');

const obtenerResumen = async (req, res) => {

    try {

        const dashboard = await model.obtenerResumen();

        return res.status(200).json({
            ok: true,
            data: dashboard
        });

    } catch (error) {

        console.error('Error al obtener Dashboard:', error);

        return res.status(500).json({
            ok: false,
            mensaje: 'Error al cargar el Dashboard'
        });

    }
};

module.exports = {
    obtenerResumen
};