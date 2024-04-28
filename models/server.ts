import express, {Application} from 'express' 
import cors from 'cors'
import db from '../db/connection';
import userRoutes from '../routes/User'
import authRoutes from '../routes/auth'
import gameRoutes from '../routes/Game'
import schoolsRoutes from '../routes/School';
import { PORT } from '../config';

class Server{

    private app: Application;
    private port: string| undefined;

    private apiPaths ={
        auth: '/api/auth',
        user: '/api/user',
        games: '/api/game',
        school: '/api/school'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT;//
        this.dbConnection();
        this.middlewares();
        this.routes(); 
    }

    async dbConnection(){
        try{
            await db.authenticate();
            console.log("database online");
        }
        catch(error){
            console.log(error);
        }
    }

    middlewares(){
        //lectura y parseo del body (conversion)
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(){
        this.app.use(this.apiPaths.auth, authRoutes)
        this.app.use(this.apiPaths.user, userRoutes)
        this.app.use(this.apiPaths.games, gameRoutes)
        this.app.use(this.apiPaths.school, schoolsRoutes)
    }
    
    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Corriendo el puerto: ${PORT}`);
        })
    }
}

export default Server;