"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pelicula = void 0;
const mongoose_1 = require("mongoose");
const peliculaSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es requerido']
    },
    director: {
        type: String
    },
    generoPelicula: {
        type: String
    },
    imagen: {
        type: String,
        require: [true, 'La imagen es requerida']
    }
});
exports.Pelicula = (0, mongoose_1.model)('Pelicula', peliculaSchema);
