const knex = {
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      /* HACER QUE LA PASSWORD NO PUEDA SER VISIBLE PARA NADIE:
        - ignorar en git
        - hacer que npm run build NO COMPILE esta carpeta
        - o si las dos anteriores opciones no funcionan, descargar XAMPP (seguramente haya que eliminar SQL instalado)
      */
      password : '',
      database : 'nodejs_coderhouse'
    }
  };

  export default knex;