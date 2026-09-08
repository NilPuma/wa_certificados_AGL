const express = require('express');
const router =  express.Router();

/* Para archivos */
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//Controllers
const controladorAuth = require('../controllers/controllerAuth');
const controladorPersona = require('../controllers/controllerPersona');
const controladorCertificados =  require('../controllers/controllerCertificado');

//Middlewares
const {verificarToken,verificarVista} = require('../middleware/authMiddleware');

const carpetaCertificados = path.join(__dirname, '../../public/uploads/certificados');

if (!fs.existsSync(carpetaCertificados)) {

    fs.mkdirSync(
        carpetaCertificados,{
            recursive: true
        }
    );

}

//Configuramos multer 
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null,carpetaCertificados);
    },


    filename: (req, file, cb) => {

        const extension = path.extname(file.originalname);
        const nombre = `certificado_${Date.now()}${extension}`;
        cb(null, nombre);
    }

});
const upload = multer({storage: storage, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);

        } else {

            cb(new Error('Solo se permiten archivos PDF'));
        }
    },

    limits: {
        fileSize: 10 * 1024 * 1024
    }
});
/* RUTAS DE APIS Y VISTAS INDEX */
// vistas de reenderizado
router.get('/', (req, res) =>{
    res.render('index');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/admin',verificarVista, (req, res) => {
    res.render('administrador');
});
router.get('/cliente', (req, res) => {
    res.render('cliente');
});

// end point backend
router.post('/api/login', controladorAuth.login);
router.post('/api/logout', controladorAuth.logout);
router.get('/api/listarPersonas',verificarToken, controladorPersona.listarPersonas);
router.get('/api/listarUsuarios',verificarToken, controladorPersona.listarUsuarios);
router.post('/api/registrarPersona', controladorPersona.registrarPersona);
router.put('/api/editarPersona/:idPersona', controladorPersona.actualizarPersona);

router.get('/api/consultarCertificado/:codigo', controladorCertificados.cosultarCertificadoPorCodigo);
router.get('/api/certificadosPersona/:idPersona',controladorCertificados.listarCertificadosPorPersona);
router.post('/api/registrarCertificado', upload.single('archivo'), controladorCertificados.registrarCertificado);
router.delete('/api/Eliminarcertificado/:id',controladorCertificados.eliminarCertificado);

module.exports = router;