import ClientSql from '../sql'
import config  from '../options/db'


const sql = new ClientSql(config);

const notes = [
    { denominacion: 'La scaloneta llego a Qatar!', contenido: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
    { denominacion: 'Messi va por la 3ra', contenido: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
    { denominacion: 'El Diego desde arriba...la mano de Dios?', contenido: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
    { denominacion: 'Todos estamos con vos, Selección', contenido: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
    { denominacion: 'Ronaldo no para de pelear', contenido: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
    { denominacion: 'Mes mundial!', contenido: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
    { denominacion: 'Aguante corazón, aguante...', contenido: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
  ]

async function test(){
    await sql.createTable();
    console.log('Tabla creada!');
    await sql.insertNote(notes);
    console.log('notas insertadas!');
    const allNotes = await sql.getAllNotes();
    console.table(allNotes);
    await sql.deleteNoteById(7);
    console.log('nota con id 7 eliminada!');
    await sql.updateNoteById({ denominacion: 'Aguante corazón, aguante...', contenido: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}, 1);
    console.log('nota actualizada!');
    sql.close()
}

test();