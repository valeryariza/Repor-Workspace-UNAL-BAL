import { Router } from "express";
const router = Router()

//Ruta POST para procesar el login

router.post('/api/login', (req, res) => {
    const {usuario, contrasena} = req.body;

    console.log("Usuario recibido: ", usuario);
    console.log("Contraseña recibida: ", contrasena);

    if (usuario === 'admin' && contrasena === '12345') {
        res.redirect('/contactos');
    } else {
        res.send("Usuario o contraseña incorrectos");
    }
});

//3. boton crear usuario
router.get('/registro', (req, res) => {
    res.send("aqui se mostrara el formulario para crear un nuevo usuario");
});

//4. enlace para restablecer contrasena
router.get('/recuperar_password', (req, res) => {
    res.send("vista o logica para enviar el correo de recuperacion de contraseña");
});

//5. enlace para recordar usuario
router.get('/recordar-usuario', (req, res) => {
    res.send("vista o logica para recordar el nombre del usuario");
});

//ruta de ejemplo para el exito del login
router.get('/contactos', (req, res) => {
    res.send("Bienvenido al sistema.");
});