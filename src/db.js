import Database from 'better-sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Esto crea (si no existe) o abre el archivo database.sqlite dentro de tu proyecto
const db = new Database(join(__dirname, 'database.sqlite'));

// Crea la tabla de usuarios si no existe todavia
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipoDocumento TEXT NOT NULL,
    numeroDocumento TEXT NOT NULL,
    primerNombre TEXT NOT NULL,
    segundoNombre TEXT,
    primerApellido TEXT NOT NULL,
    segundoApellido TEXT NOT NULL,
    fechaNacimiento TEXT NOT NULL,
    correo TEXT NOT NULL UNIQUE,
    contrasena TEXT NOT NULL
  )
`);

export default db;