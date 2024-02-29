import { NextFunction, Request, Response} from "express";

const { validationResult } = require("express-validator");


export const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const errores = validationResult( req );
    console.log(errores.array());
    if( !errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        })
    }
    next();
}