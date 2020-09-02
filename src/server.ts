//llamar a express
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';


//llamar rutas

import producto from './routes/producto';
import categoria from './routes/categoria';


//clase
class Server{
    public app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
        
    }

    config(){
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(helmet()); 
         //conexion a bdd
         const MONGO_URI = 'mongodb+srv://joss:12345@cluster0.j6xzm.mongodb.net/deber?retryWrites=true&w=majority';
         mongoose.connect(MONGO_URI,{useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true}).then(()=>{
             console.log("BDD Ok");
         }); 
         this.app.use(compression());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
              
        

        
        }

    routes(){
        this.app.use('/api/producto',producto);
        this.app.use('/api/categoria',categoria);
        
    }

    start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log("SERVIDOR FUNCIONANDO");
        });
    }

}

const server = new Server();
server.start();