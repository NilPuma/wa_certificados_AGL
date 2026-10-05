const model = require('../models/modelCertificado');

const path = require('path');
const fs = require('fs');
const { log } = require('console');

// Buscar certificado por codigo
const cosultarCertificadoPorCodigo = async (req, res) => {
  try {
    /* const { codigo } = req.body; */
    const { codigo } = req.params;

    if (!codigo) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Debe ingresar un código de certificado'
      });
    }

    /* Enviamos el codigo al modelo para que hag la consulta */
    const certificado = await model.buscarCertificadoPorCodigo(codigo);
      if (!certificado) {
        return res.json({
            ok: false,
            mensaje: 'El certificado no existe'
        });

      }

    return res.json({ok: true, certificado});
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      ok: false,
      mensaje: 'Error interno del servidor' 
    });
  }
};

// Listar Certificados por persona
const listarCertificadosPorPersona = async (req, res) => {

  try {
    const { idPersona } = req.params;
    
      
    if (!idPersona) {

      return res.status(400).json({
        ok: false,
        mensaje: 'ID de persona requerido'
      });

    }

    const certificados = await model.listarCertificadosPorPersona(idPersona);
    return res.json({ ok: true, certificados });

  } catch (error) {

    console.error(error);
    return res.status(500).json({ ok: false, mensaje: 'Error al listar certificados'});
  }

};

//Controller para registrar PDFs
const registrarCertificado = async (req, res) => {
  try {
      const {id_persona, codigo, titulo, descripcion} = req.body;

      if ( !id_persona || !codigo || !titulo ) {

        return res.status(400).json({ok: false, mensaje: 'Complete los campos obligatorios'});
      }

      if (!req.file) {

        return res.status(400).json({

          ok: false, mensaje: 'Debe seleccionar un archivo PDF'
        });

      }
      //Verificar codigo 
      const existeCodigo = await model.buscarCertificadoPorCodigo(codigo);

      if (existeCodigo) {

        fs.unlink(req.file.path, () => {});

        return res.status(409).json({
          ok: false,
          mensaje: 'El código del certificado ya existe'
        });

        }

      // URL del PDF
      const url_pdf = `/uploads/certificados/${req.file.filename}`;


      // Guardar el certificado
      const resultado =
          await model.registrarCertificado({

              id_persona,
              codigo,
              titulo,
              descripcion: descripcion || null,
              url_pdf,
              estado: 'vigente',
              fecha_modificacion: new Date()
          });


      return res.status(201).json({

          ok: true,
          mensaje: 'Certificado registrado correctamente',

          id_certificado: resultado.insertId, 
          url_pdf});


  } catch (error) {
    console.error(error);
    // Si ocurrió error después de subir archivo, eliminamos el PDF.

    if (req.file) {

      fs.unlink(req.file.path, () => {});
    }


    return res.status(500).json({

    ok: false, mensaje: 'Error al registrar certificado'});
  }

};

//Actualizar datos de certificado
const actualizarCertificado = async (req, res) => {

  try {
      const { id } = req.params;
      const { codigo, titulo, descripcion, estado } = req.body;

      const certificado = await model.buscarCertificadoPorId(id);


      if (!certificado) {

        if (req.file) {
            fs.unlink(req.file.path, () => {});
        }
        return res.status(404).json({
          ok: false,
          mensaje: 'Certificado no encontrado'
        });

      }

      // Conservamos PDF anterior
      let url_pdf = certificado.url_pdf;

      // Si se subio otro PDF
      if (req.file) {
        
        url_pdf = `/uploads/certificados/${req.file.filename}`;
      }

      await model.actualizarCertificado(
          id,
          {

              codigo,
              titulo,
              descripcion:
                  descripcion || null,

              url_pdf,

              estado:
                  estado || 'ACTIVO'

          }
      );

      // Elimnar el anterior
      if ( req.file && certificado.url_pdf) {

          const archivoAnterior = path.join(__dirname, '../../public/', certificado.url_pdf);
          fs.unlink( archivoAnterior, error => {
                if (error && error.code !== 'ENOENT') {
                  console.error(error);
                }
              }
          );

      }


      return res.json({

        ok: true,
        mensaje: 'Certificado actualizado correctamente'
      });


  } catch (error) {

    console.error(error);
    return res.status(500).json({

      ok: false,
      mensaje:'Error al actualizar certificado'
    });
  }
};

//Controller para eliminar certificado
const eliminarCertificado = async (req, res) => {

    try {
        const { id } = req.params;

        //Busca el certificado a eliminar
        const certificado = await model.buscarCertificadoPorId(id);

        if (!certificado) {
          return res.status(404).json({ ok: false, mensaje: 'Certificado no encontrado'});
        }

        // Indicamos a modelo para que lo elimine de la DB
        await model.eliminarCertificado(id);

        // Eliminar PDF Fisiso
        if (certificado.url_pdf) {

          const archivo = path.join(__dirname,'../../public', certificado.url_pdf);

          fs.unlink(archivo,(error) => {
            if (error) {
              console.log('No se pudo eliminar archivo:', error.message);
            }
          });
        }
        return res.json({
          ok: true, 
          mensaje: 'Certificado eliminado correctamente'
        });
    } catch (error) {

      console.error(error);
      return res.status(500).json({
          ok: false,
          mensaje: 'Error al eliminar certificado'

      });

    }

};

module.exports = {
  cosultarCertificadoPorCodigo,
  listarCertificadosPorPersona,
  registrarCertificado,
  eliminarCertificado
};
