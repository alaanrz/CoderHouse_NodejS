import knex from "knex";

class ClientSql{
    constructor(config){
        this.knex = knex(config)
    }

    async createTable(){
        await this.knex.schema.dropTableIfExists('notas');
        await this.knex.schema.createTable('notas', table => 
            {
                table.increments('id').primary();
                table.string('denominacion', 100).notNullable();
                
            }
        )
    }
}