import knex from "knex";

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