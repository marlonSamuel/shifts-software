import { Request, Response } from 'express';
import {route, GET, POST, PUT, DELETE, before} from 'awilix-express';
import { BranchService } from '../services/branch.service';
import { BranchCreateDto } from '../dtos/branch.dto';
import { BaseController } from '../common/controllers/base.controller';
import { check } from 'express-validator';
import { validateFields } from '../common/midlewares/validate_fields.midleware';
import { validateJWT } from '../common/midlewares/validate_jwt.midleware';

@route('/branches')
export class BranchController extends BaseController {
    constructor(private readonly branchService: BranchService)
    {
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        try{
            res.send(
                await this.branchService.all()
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
            let result = await this.branchService.find(id)
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
        check('dir').notEmpty(),
        validateFields
    ])
    public async create(req: Request, res: Response) {
        try{
            await this.branchService.create({
                name: req.body.name,
                dir: req.body.dir
            } as BranchCreateDto);
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
        check('dir').notEmpty(),
        validateFields
    ])
    public async update(req: Request, res: Response) {
        try {
            const id = req.params.id;

            await this.branchService.update(id, {
                name: req.body.name,
                dir: req.body.dir
            } as BranchCreateDto);

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
            await this.branchService.remove(id);
            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }
}