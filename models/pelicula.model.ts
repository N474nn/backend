import { Document, model, Schema } from "mongoose";


const peliculaSchema = new Schema({
        nombre:{
            type : String,
            require : [true,'El nombre es requerido']
        },
        director:{  
            type : String
        },
        generoPelicula:{
            type : String
        },
        imagen:{
            type : String,
            require : [true,'La imagen es requerida']
        }
    });

    interface IPelicula extends Document{
        nombre:string;
        director:string;
        generoPelicula:string;
        imagen:string
    }

    export const Pelicula = model<IPelicula>('Pelicula',peliculaSchema);