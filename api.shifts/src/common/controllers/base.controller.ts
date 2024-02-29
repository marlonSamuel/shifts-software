import { Response } from 'express';
import { ApplicationException } from "../exceptions/application.exception";

export abstract class BaseController {
    handleException(err: any, res: Response) {
        if (err instanceof ApplicationException) {
            res.status(400);
            res.send({ok: false,message:err.message});
        } else {
            console.log(err.message);
            res.status(500).send({ok: false,message:'Error inesperado'});
            //throw new Error(err);
        }
    }
}