"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pelicula_model_1 = require("../models/pelicula.model");
const peliculaRoutes = (0, express_1.Router)();
peliculaRoutes.get('/paging', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const peliculas = yield pelicula_model_1.Pelicula.find();
    return res.json({
        ok: true,
        peliculas
    });
}));
peliculaRoutes.get('/paging', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pelPage = 15;
    let page = Number(req.query.page) || 1;
    let skip = page - 1;
    skip = skip * pelPage;
    const peliculas = yield pelicula_model_1.Pelicula.find().skip(skip).limit(pelPage);
    return res.json({
        ok: true,
        msj: "Ok Paging"
    });
}));
peliculaRoutes.post('/', (req, res) => {
    const body = req.body;
    const pelicula = {
        nombre: body.nombre,
        director: body.director,
        generoPelicula: body.generoPelicula,
        imagen: body.imagen
    };
    pelicula_model_1.Pelicula.create(pelicula).then(peliculaDb => {
        return res.json({
            ok: true,
            peliculaDb
        });
    }).catch(err => {
        return res.json({
            ok: false,
            err
        });
    });
});
peliculaRoutes.put('/:id', (req, res) => {
    const peliculaId = req.params.id;
    const body = req.body;
    const pelicula = {
        nombre: body.nombre,
        director: body.director,
        generoPelicula: body.generoPelicula,
        imagen: body.imagen
    };
    pelicula_model_1.Pelicula.findByIdAndUpdate(peliculaId, pelicula).then(peliculaDb => {
        return res.json({
            ok: true,
            peliculaDb
        });
    });
});
peliculaRoutes.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const peliculaId = req.query.id;
    if (!peliculaId) {
        return res.json({
            ok: false,
            msj: "El registro solicitado no existe"
        });
    }
    pelicula_model_1.Pelicula.findByIdAndDelete(peliculaId).then(pelicula => {
        return res.json({
            ok: true,
            msj: "Eliminado correctamente"
        });
    }).catch(err => {
        return res.json({
            ok: false,
            msj: "El registro solicitado no existe"
        });
    });
}));
exports.default = peliculaRoutes;
