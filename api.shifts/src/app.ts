process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';


import dotenv from 'dotenv';
import { Server } from './server';

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

process.env.TZ = 'America/Guatemala';

console.log(process.env.APP_FOO);

//instance of server class
const server = new Server();

//execute configuration
server.execute();




/* import express, {Request,Response, NextFunction } from "express";
import {loadControllers} from 'awilix-express';
import loadContainer from './container';
import dbConnection from './common/persistence/mongodb.persistence';
import {expressjwt} from 'express-jwt';
import cors from 'cors';

const app: express.Application = express();

// JSON suupoer
app.use(express.json());
// CORS Support
app.use(cors());

//container
loadContainer(app);

//Jwt
if (process.env.jwt_secret_key) {
    app.use(expressjwt({
        secret: process.env.jwt_secret_key,
        algorithms: ['HS256']
     }).unless({ path: ['/', '/check','/users/login']}));
}

//captura error global de acceso no autorizado
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
    if(err.name === 'UnauthorizedError') {
      res.status(err.status).send({ok: false, message:err.message});
      return;
    }
    next();
});


//controllers
app.use(loadControllers(
    'controllers/*.ts',
    {cwd: __dirname}
));

dbConnection();

export { app }; */