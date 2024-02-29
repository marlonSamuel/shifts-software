import { Request, Response } from 'express';
import {route, GET, POST, PUT, DELETE, before} from 'awilix-express';
import { BaseController } from '../common/controllers/base.controller';
import { check } from 'express-validator';
import {validateFields} from '../common/midlewares/validate_fields.midleware';
import { DepartmentManagementService } from '../services/deparment_management.service';
import { DepartmentManagementCreateDto } from '../dtos/deparment_management.dto';

@route('/department_managements')
export class DepartmentManagementController extends BaseController {
    constructor(private readonly deparmentManagementService: DepartmentManagementService)
    {
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        try{
            res.send(
                await this.deparmentManagementService.all()
            );
        }catch (error){
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @GET()
    public async find(req: Request, res: Response) {
        try{
            const id = req.params.id;
            let result = await this.deparmentManagementService.find(id)
            if (result) {
                res.send(result);
            } else {
                res.status(404);
                res.send();
            }
        }catch (error){
            this.handleException(error, res);
        }

    }

    @POST()
    @before([
        check('branch_department_id').notEmpty(),
        check('management_type_id').isArray().notEmpty(),
        validateFields
    ])
    public async create(req: Request, res: Response) {
        console.log("entro acá")
        try{
            await this.deparmentManagementService.create({
                management_type_id: req.body.management_type_id,
                branch_department_id: req.body.branch_department_id
            } as DepartmentManagementCreateDto);
            res.send();
        }catch (error){
            console.log("entro acá");
            this.handleException(error, res);
        }

    }
}