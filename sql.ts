import knex from "knex";

/* 
Se podría y deberia agregar try/catch/finally en cada metodo que llama promesas, para que si algo falla en algun metodo de base de datos (knex) 
se 
    - imprima el error por console.log 
    - se lance un throw del error ej. console.log(err); throw err
    - y hacer un destroy de la conexion.
    
Nota: throw err > es para que la ejecución de la función actual se detenga (las declaraciones posteriores a throw no se ejecuten) y el control pase al primer bloque catch 
en la pila de llamadas. Si no existe ningún bloque catch entre las funciones de llamada, el programa terminará.  
*/

class ClientSql{
    knex: any;
    constructor(config : any){
        this.knex = knex(config)
    }

    async createTable(){
        await this.knex.schema.dropTableIfExists('notas');
        await this.knex.schema.createTable('notas', (table: any) => 
            {
                table.increments('id').primary();
                table.string('denominacion', 100).notNullable();
                table.string('contenido', 100).notNullable();
            }
        )
    }
    async getAllNotes(){
        return await this.knex.from('notas').select('*');
    }
    async insertNote(note: any){
        await this.knex('notas').insert(note);
    }
    async deleteNoteById(id: number){
        await this.knex.from('notas').where('id', id).del();
    }
    async updateNoteById(data: any, id: number){
        await this.knex.from('notas').where('id', id).update({
            denominacion: data.denominacion,
            contenido: data.contenido
        });
    }
    async close(){
        await this.knex.destroy();
    }
}

export default ClientSql;