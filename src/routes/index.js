import { Router } from "express"
import db from "../db.js"
import bcrypt from "bcrypt"

const router = Router ()

const hora = new Date().toLocaleString('es-CO')

router.get('/contactos',(req,res) => res.render ('contactos.ejs', {etiqueta: 'Pagina de contactos empresariales'}) )
router.get('/sobre_nosotros',(req,res) => res.render ('sobre_nosotros.ejs', {etiqueta: 'Todo Bien'}) )
router.get('/menu',(req,res) => res.render ('menu.ejs', {etiqueta: 'Menu Empresarial'}) )
router.get('/',(req,res) => res.render ('index', {etiqueta: 'Mi primer sitio web con NodeJS', hora:hora }) )

// --- RUTA GET PARA EL LOGIN ---
router.get('/login', (req, res) => {
    res.render('login', { 
        etiqueta: 'Vista de inicio de sesion',
        mensaje: null 
    }); 
});

// --- RUTA POST PARA PROCESAR EL LOGIN (conectada a la base de datos) ---
router.post('/login', (req, res) => { 
    const { email, contrasena } = req.body; 

    // Buscar el usuario por correo en la base de datos
    const usuario = db.prepare('SELECT * FROM usuarios WHERE correo = ?').get(email);

    if (!usuario) {
        return res.render('login', {
            etiqueta: 'Vista de inicio de sesion', 
            mensaje: 'Email o contraseña incorrectos'
        });
    }

    // Comparar la contraseña escrita con la encriptada guardada en la BD
    const contrasenaValida = bcrypt.compareSync(contrasena, usuario.contrasena);

    if (!contrasenaValida) {
        return res.render('login', {
            etiqueta: 'Vista de inicio de sesion', 
            mensaje: 'Email o contraseña incorrectos'
        });
    }

    // Si todo coincide, login exitoso
    return res.redirect('/menu');
});

// --- Mostrar formulario de registro ---
router.get('/registro', (req, res) => {
    res.render('registro', {
        etiqueta: 'Registro de Usuario',
        error: null
    });
});

// --- RUTA POST PARA REGISTRAR (conectada a la base de datos) ---
router.post('/registro', async (req, res) => {
    const { 
        tipoDocumento, 
        numeroDocumento, 
        primerNombre,
        segundoNombre, 
        primerApellido, 
        segundoApellido, 
        fechaNacimiento, 
        correo, 
        confirmarCorreo,
        contrasena,
        confirmarContrasena 
    } = req.body;

    // Validar que los correos coincidan
    if (correo !== confirmarCorreo) {
        return res.render('registro', { 
            etiqueta: 'Registro de Usuario',
            error: 'Los correos electrónicos no coinciden.' 
        });
    }

    // Validar que las contraseñas coincidan
    if (contrasena !== confirmarContrasena) {
        return res.render('registro', { 
            etiqueta: 'Registro de Usuario',
            error: 'Las contraseñas no coinciden.' 
        });
    }

    try {
        // Verificar si el correo ya está registrado
        const existente = db.prepare('SELECT id FROM usuarios WHERE correo = ?').get(correo);
        if (existente) {
            return res.render('registro', {
                etiqueta: 'Registro de Usuario',
                error: 'Ya existe una cuenta registrada con ese correo.'
            });
        }

        // Encriptar la contraseña antes de guardarla (nunca en texto plano)
        const contrasenaEncriptada = bcrypt.hashSync(contrasena, 10);

        // Insertar el nuevo usuario en la base de datos
        db.prepare(`
            INSERT INTO usuarios 
            (tipoDocumento, numeroDocumento, primerNombre, segundoNombre, primerApellido, segundoApellido, fechaNacimiento, correo, contrasena)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(tipoDocumento, numeroDocumento, primerNombre, segundoNombre, primerApellido, segundoApellido, fechaNacimiento, correo, contrasenaEncriptada);

        console.log("Usuario registrado con exito:", correo);

        // Redirigir al login
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.render('registro', { 
            etiqueta: 'Registro de Usuario',
            error: 'Hubo un error al registrar el usuario.' 
        });
    }
});

export default router