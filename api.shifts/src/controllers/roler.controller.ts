import { Request, Response } from 'express';
import {route, GET} from 'awilix-express';
import { BaseController } from '../common/controllers/base.controller';
import { RoleService } from '../services/role.service';

@route('/roles')
export class RoleController extends BaseController {
    constructor(private readonly roleService: RoleService)
    {
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        try{
            res.send(
                await this.roleService.all()
            );
        }catch (error){
            this.handleException(error, res);
        }
    }
}