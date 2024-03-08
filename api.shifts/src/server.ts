//import {app} from './app';
import express, { NextFunction, Response } from 'express';
import http from 'http';
import { Sockets } from './common/sockets/sockets';
import dotenv from 'dotenv';
import cors from 'cors';

import loadContainer from './container';
import { expressjwt } from 'express-jwt';
import { loadControllers } from 'awilix-express';
import dbConnection from './common/persistence/mongodb.persistence';

//import socket io server
const socketio = require('socket.io');
//const server = http.createServer(app);

export class Server {
    private app: any;
    private server: any;
    private io: any;

    constructor(){
        const app: express.Application = express();
        this.app = app;
        // http server
        this.server = http.createServer(this.app);

        dbConnection();
        
        // Configuraciones de sockets
        this.io = socketio(this.server,{
            /* configuraciones */
        });
    }

    middlewares(){
        //deploy public directory
        this.app.use(express.static(__dirname + '/public'));

        // JSON suupoer
        this.app.use(express.json());
        // CORS Support
        this.app.use(cors());

        //container
        loadContainer(this.app);

        //Jwt
        if (process.env.jwt_secret_key) {
            this.app.use(expressjwt({
                secret: process.env.jwt_secret_key,
                algorithms: ['HS256']
            }).unless({ path: ['/', '/check','/users/login']}));
        }

        //captura error global de acceso no autorizado
        this.app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
            if(err.name === 'UnauthorizedError') {
            res.status(err.status).send({ok: false, message:err.message});
            return;
            }
            next();
        });
        //controllers
        this.app.use(loadControllers(
            'controllers/*.ts',
            {cwd: __dirname}
        ));

       
        
    }

    //function to iniailize socket
    socketConfiguration(){
        new Sockets(this.io); 
    }
    
    execute(){    
        //initialize middlewares
        this.middlewares();

        //initialize socket
        this.socketConfiguration();
        console.log("acá");
        //initialize server
        this.server.listen(8080, ()=> {
            console.log("server run in port 8080");
        });
    }
}