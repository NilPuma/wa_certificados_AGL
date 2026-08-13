const express = require('express');
const router =  express.Router();


const controladorUsuarios = require('../controllers/controllerUsuario');
const controladorCertificado =  require('../controllers/controllerCertificado');

/* RUTAS DE APIS Y VISTAS INDEX */
// vistas de reenderizado
router.get('/', (req, res) =>{
    res.render('index');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/admin', (req, res) => {
    res.render('administrador');
});
router.get('/cliente', (req, res) => {
    res.render('cliente');
});

// end point backend
router.get('/api/listarUsuarios', controladorUsuarios.listarUsuarios);
router.post('/api/consultarCertificado', controladorCertificado.cosultarCertificado);


module.exports = router;