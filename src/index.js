import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import rutasdenavegacion from './routes/index.js'


const app = express()

// Ruta absoluta
const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(join(__dirname, '/views'))

app.set('views', join(__dirname, '/views'))
app.set('view engine', 'ejs')

// 1. Middleware para leer datos de formularios
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// 2. Carpeta publica para archivos estaticos (css, img)
app.use(express.static(join(__dirname, 'public')))

// 3. Usar las rutas de la aplicacion
app.use(rutasdenavegacion)


// 4. Ruta para iniciar el servidor
app.listen(10)
console.log('Hola Mundo')
console.log('El servidor es:', 10)