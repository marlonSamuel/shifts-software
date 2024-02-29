import { NextFunction, Request, Response } from "express";

const jwt = require('jsonwebtoken');

export const validateJWT = ( req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');
        console.log(token);
        if(!token){
            return res.status(401).json({
                ok: false,
                msg: 'Acceso no autorizado'
            })
        }

        let verify = jwt.verify(token,process.env.JWT_SECRET_KEY);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no es válido'
        });
    }

}