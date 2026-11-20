const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const modelAuth = require('../models/modelAuth');

const login = async (req, res) => {
    try {
        const { usuario, password } = req.body;
        // 1. Validar que lleguen los datos
        if (!usuario || !password) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Ingrese usuario y contraseña'
            });
        }
        // 2. Buscar usuario en BD
        const usuarioDB = await modelAuth.buscarUsuario(usuario);
        
        // 3. Usuario no existe
        if (!usuarioDB) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Usuario/contraseña incorrectos o no esxiste'
            });
        }
        // 4. Verificar estado del usuario
        if (usuarioDB.estado != 'activo') {
            return res.status(403).json({
                ok: false,
                mensaje: 'El usuario se encuentra inactivo'
            });
        }
        // 5. Comparar contraseña
        const passwordCorrecta = await bcrypt.compare(password,usuarioDB.password);
        console.log(passwordCorrecta);
        
        if (!passwordCorrecta) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }
        
        // 6. Crear JWT
        const token = jwt.sign(
            {
                id: usuarioDB.id_usuario,
                usuario: usuarioDB.usuario
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '12h'
            }

        );
        // 7. Guardar JWT en cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 12 * 60 * 60 * 1000
        });
        // 8. Respuesta al frontend
        return res.json({
            ok: true,
            mensaje: 'Login correcto',
            usuario: {
                id: usuarioDB.id_usuario,
                usuario: usuarioDB.usuario
            }
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno del servidor'
        });
    }
};


const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({
        ok: true,
        mensaje: 'Sesión cerrada correctamente'
    });

};


module.exports = {
    login,
    logout
};