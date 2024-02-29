import { Request, Response } from 'express';
import {route, GET} from 'awilix-express';
import { TestService } from '../services/test.service';

@route('/check')
export class DefaultController {
    constructor(private readonly testService: TestService){

    }

    @GET()
    public index(req: Request, resp: Response): void {
        resp.send({
            node_env: process.env.NODE_ENV = process.env.NODE_ENV || 'development',
            app_env: process.env.APP_ENV = process.env.APP_ENV || 'development'
        });
    }

    @route('/test')
    @GET()
    public TEST(req: Request, resp: Response): void {
        resp.send(this.testService.get());
    }
}