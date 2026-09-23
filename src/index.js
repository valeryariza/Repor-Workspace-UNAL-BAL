import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import rutasdenavegacion from './routes/index.js'
import authRoutes from './routes/autenticacion.js'

const app = express()

//ruta absoluta
const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(join(__dirname, '/views'))

app.set('views', join(__dirname, '/views'))
app.set('view engine', 'ejs')

//middleware para parsear datos del formulario (body de POST)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//ruta de la carpeta publica para archivos estaticos (css, imgs, video)
app.use(express.static(join(__dirname, 'public')))

//ruta para llamar aplicacion
app.use(rutasdenavegacion)
app.use(authRoutes)

//ruta para iniciar el servidor
app.listen(10)
console.log('Hola Mundo')
console.log('El servidor es:', 10)