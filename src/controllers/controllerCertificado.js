const model = require('../models/modelCertificado');

// 1. buscar certificado
const cosultarCertificado = async (req, res) => {
  try {
    const { codigo } = req.body;

    if (!codigo) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Debe ingresar un código de certificado'
      });
    }

    /* Enviamos el codigo al modelo para que los busque */
    const certificado = await model.buscarCertificado(codigo);
      if (!certificado) {
        return res.json({
            ok: false,
            mensaje: 'El certificado no existe'
        });

      }

      return res.json({
          ok: true,
          mensaje: 'Certificado encontrado',
          data: certificado
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      ok: false,
      mensaje: 'Error interno del servidor' 
    });
  }
};

module.exports = {
  cosultarCertificado
};
