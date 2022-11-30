/*
  SOLUCION PARA MANTENER OCULTOS LOS DATOS SENSIBLES/CREDENCIALES (PASSWORD sobre todo) DE LA CONEXION:
    - dotenv con archivo .env
      - .env se ignora en git (esto debe hacerse agregando el archivo en .gitignore) ✓
      - se logra que "npm run build" NO COMPILE las credenciales de forma literal, sino con process.env.DB_PASSWORD ✓

  import dotenv from 'dotenv';
  dotenv.config();

  const knex = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        port : process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'nodejs_coderhouse'
    }
  };
  export default knex; 
*/

/*   const knex = {
    client: 'sqlite3',
    connection: {
        filename: './DB/ecommerce.sqlite'
    },
    useNullAsDefault: true
  }
  export default knex; */

import mongoose from 'mongoose';

const connectionString = 'mongodb://localhost:27017/ecommerce';

const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};
export default initMongoDB;