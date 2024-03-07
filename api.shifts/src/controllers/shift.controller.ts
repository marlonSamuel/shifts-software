import { Request, Response } from 'express';
import {route, GET, POST, PUT, DELETE, before} from 'awilix-express';
import { BranchCreateDto } from '../dtos/branch.dto';
import { BaseController } from '../common/controllers/base.controller';
import { check } from 'express-validator';
import { validateFields } from '../common/midlewares/validate_fields.midleware';
import { ShiftService } from '../services/shift.service';
import { ShiftCreateDto } from '../dtos/shift.dto';

@route('/shifts')
export class ShiftController extends BaseController {
    constructor(private readonly shiftService: ShiftService)
    {
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        try{
            res.send(
                await this.shiftService.all()
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
            let result = await this.shiftService.find(id)
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

    @route('/today/:id')
    @GET()
    public async findByBranchAndDate(req: Request, res: Response) {
        try{
            const id = req.params.id;
            let result = await this.shiftService.findByBranch(id)
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
        validateFields
    ])
    public async create(req: Request, res: Response) {
        let auth = (req as any).auth;
        auth._branch_department = req.body.branch_department_id;
        try{
            let shift = await this.shiftService.create(auth);
            res.send(shift);
        }catch (error){
            console.log("entro acá");
            this.handleException(error, res);
        }

    }

    @route('/:id')
    @PUT()
    @before([
        check('name').notEmpty(),
        check('dir').notEmpty(),
        validateFields
    ])
    public async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            let shift = await this.shiftService.update(id, req.body as ShiftCreateDto);

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
            await this.shiftService.remove(id);
            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }
}