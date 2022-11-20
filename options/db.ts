/* 
HACER QUE LA PASSWORD NO PUEDA SER VISIBLE PARA NADIE:
  - ignorar en git
  - hacer que npm run build NO COMPILE esta carpeta
  - o si las dos anteriores opciones no funcionan, descargar XAMPP (seguramente haya que eliminar SQL instalado)

SOLUCIÓN ABAJO CON dotenv.
*/
/* const knex = {
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'nodejs_coderhouse'
    }
  };

  export default knex; */

/*
  SOLUCION PARA MANTENER OCULTOS LOS DATOS SENSIBLES/CREDENCIALES DE LA CONEXION:
    - dotenv con archivo .env

  import dotenv from 'dotenv';
  dotenv.config();

  const knex = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'nodejs_coderhouse'
    }
  };
  export default knex; */

  const knex = {
    client: 'sqlite3',
    connection: {
        filename: './DB/ecommerce.sqlite'
    },
    useNullAsDefault: true
  }
  export default knex;