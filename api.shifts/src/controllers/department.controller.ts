import { Request, Response } from 'express';
import {route, GET, POST, PUT, DELETE, before} from 'awilix-express';
import { BaseController } from '../common/controllers/base.controller';
import { DepartmentService } from '../services/department.service';
import { DepartmentCreateDto } from '../dtos/department.dto';
import { check } from 'express-validator';
import {validateFields} from '../common/midlewares/validate_fields.midleware';
import { validateJWT } from '../common/midlewares/validate_jwt.midleware';

@route('/departments')
export class DepartmentController extends BaseController {
    constructor(private readonly departmentService: DepartmentService)
    {
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        try{
            res.send(
                await this.departmentService.all()
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
            let result = await this.departmentService.find(id)
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
        check('code').notEmpty(),
        validateFields
    ])
    public async create(req: Request, res: Response) {
        try{
            await this.departmentService.create({
                name: req.body.name,
                code: req.body.code
            } as DepartmentCreateDto);
            res.send();
        }catch (error){
            console.log("entro acá");
            this.handleException(error, res);
        }

    }

    @route('/:id')
    @PUT()
    @before([
        check('name').notEmpty(),
        check('code').notEmpty(),
        validateFields
    ])
    public async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await this.departmentService.update(id, {
                name: req.body.name,
                code: req.body.code
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
            await this.departmentService.remove(id);
            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }
}