import { Request, Response } from 'express';
import {route, GET} from 'awilix-express';
import { TestService } from '../services/test.service';

@route('/default')
export class DefaultController {
    constructor(private readonly testService: TestService){

    }

    @GET()
    public index(req: Request, resp: Response): void {
        resp.send('Running...');
    }
}