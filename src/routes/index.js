import { Router } from "express"

const router = Router()

const hora = new Date().toLocaleTimeString('es-co', {hour: '2-digit', minute: '2-digit'})

router.get('/contactos', (req, res) => res.render('contactos.ejs', {title_contacts: 'Contactos Empresariales'}))
router.get('/sobre_nosotros', (req, res) => res.render('sobre_nosotros.ejs', {title_about_us: 'Sobre Nosotros'}))
router.get('/menu', (req, res) => res.render('menu.ejs', {title_menu: 'Menu Empresarial'}))
router.get('/', (req, res) => res.render('index', {etiqueta: 'Sitio Web Node JS', hora: hora}))

// ruta GET para el login (única, con mensajes incluidos)
router.get('/login', (req, res) => {
    res.render('login.ejs', {
        etiqueta: 'vista de inicio de sesion',
        mensaje: null
    })
})

// ruta POST para procesar el login
router.post('/login', (req, res) => {
    const { usuario, contrasena } = req.body;

    if (usuario === 'admin' && contrasena === '1234') {
        return res.redirect('/menu');
    }

    return res.render('login.ejs', {
        etiqueta: 'vista de inicio de sesion',
        mensaje: 'Usuario o contraseña incorrectos'
    });
});

export default router