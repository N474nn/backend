import { Request, Response, Router } from "express";
import { Pelicula } from "../models/pelicula.model";

const peliculaRoutes = Router();

peliculaRoutes.get('/paging', async(req:Request,res:Response)=>{

    const peliculas = await Pelicula.find();

    return res.json({
        ok:true,
        peliculas
    })
})

peliculaRoutes.get('/paging',async (req:Request,res:Response)=>{

    let pelPage = 15;
    let page = Number(req.query.page) || 1 ;
    let skip = page-1;
    skip = skip*pelPage;

    const peliculas = await Pelicula.find().skip(skip).limit(pelPage);

    return res.json({
        ok:true,
        msj:"Ok Paging"
    })
});

peliculaRoutes.post('/',(req:Request,res:Response)=>{
    
    const body = req.body; 

    const pelicula = {
        nombre:body.nombre,
        director:body.director,
        generoPelicula:body.generoPelicula,
        imagen:body.imagen
    }

    Pelicula.create(pelicula).then(peliculaDb =>{

        return res.json({
            ok:true,
            peliculaDb
        })
    }).catch(err=>{
        return res.json({
            ok:false,
            err
        })
    })
    
});

peliculaRoutes.put('/:id',(req:Request, res:Response)=>{

    const peliculaId = req.params.id;
    const body = req.body;

    const pelicula = {
        nombre:body.nombre,
        director:body.director,
        generoPelicula:body.generoPelicula,
        imagen:body.imagen
    }

    Pelicula.findByIdAndUpdate(peliculaId,pelicula).then(peliculaDb=>{

        return res.json({
            ok:true,
            peliculaDb
        })
    })    
});

peliculaRoutes.delete('/',async(req:Request,res:Response)=>{

    const peliculaId = req.query.id;

    if(!peliculaId){

        return res.json({
            ok:false,
            msj:"El registro solicitado no existe"
        })
    }


    Pelicula.findByIdAndDelete(peliculaId).then(pelicula=>{
        return res.json({
            ok:true,
            msj:"Eliminado correctamente"
        })
    }).catch(err=>{

        return res.json({
            ok:false,
            msj:"El registro solicitado no existe"
        })

    })
    
})


export default peliculaRoutes;