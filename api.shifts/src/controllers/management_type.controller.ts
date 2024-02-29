import { Request, Response } from 'express';
import {route, GET, POST, PUT, DELETE, before} from 'awilix-express';
import { BaseController } from '../common/controllers/base.controller';
import { DepartmentCreateDto } from '../dtos/department.dto';
import { ManagementTypeService } from '../services/management_type.service';
import { check } from 'express-validator';
import { validateFields } from '../common/midlewares/validate_fields.midleware';

@route('/management_types')
export class ManagementTypeController extends BaseController {
    constructor(private readonly managementTypeService: ManagementTypeService)
    {
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        try{
            res.send(
                await this.managementTypeService.all()
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
            let result = await this.managementTypeService.find(id)
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
        check('name').notEmpty(),
        validateFields
    ])
    public async create(req: Request, res: Response) {
        try{
            await this.managementTypeService.create({
                name: req.body.name
            } as DepartmentCreateDto);
            res.send();
        }catch (error){
            this.handleException(error, res);
        }

    }

    @route('/:id')
    @PUT()
    @before([
        check('name').notEmpty(),
        validateFields
    ])
    public async update(req: Request, res: Response) {
        try {
            const id = req.params.id;

            await this.managementTypeService.update(id, {
                name: req.body.name
            } as DepartmentCreateDto);

            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @DELETE()
    public async remove(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await this.managementTypeService.remove(id);
            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }
}