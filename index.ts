import bodyParser from "body-parser";
import mongoose from "mongoose";
import Server from "./classes/server";
import defaultRoutes from "./routes/default.routes";
import peliculaRoutes from "./routes/pelicula.routes";

const server = new Server();

server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({extended:true}));

server.app.use('/',defaultRoutes);
server.app.use('/peliculas',peliculaRoutes);

mongoose.connect('mongodb+srv://SS-peliculas:G4otkyE8TmU0GADv@cluster0.nvhnemn.mongodb.net/moviesDb',(error)=>{
    if(error){
        throw error;
    }

    console.log('Base de datos online');
})

server.Start(()=>{
    console.log(`Servidor corriendo en puerto: ${server.port}`);
})