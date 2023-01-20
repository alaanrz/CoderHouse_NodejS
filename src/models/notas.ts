import mongoose from 'mongoose';

export const notasCollectionName = 'notas';

const notasSchema = new mongoose.Schema({
    denominacion: {type: String, required: true},
    contenido: {type: String, required: true},
    autor: {
        id: Number,
        nombre: String,
        apellido: String
    } 
});

export const notasModel = mongoose.model(
    notasCollectionName,
    notasSchema
);