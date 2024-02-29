import { Request, Response } from 'express';
import {route, GET, POST, PUT, DELETE, before} from 'awilix-express';
import { BranchCreateDto } from '../dtos/branch.dto';
import { BaseController } from '../common/controllers/base.controller';
import { check } from 'express-validator';
import { validateFields } from '../common/midlewares/validate_fields.midleware';
import { ShiftService } from '../services/shift.service';
import { ShiftCreateDto } from '../dtos/shift.dto';
import { AttendShiftService } from '../services/attend_shift.service';
import { AttendShiftCreateDto, AttendShiftUpdateDto } from '../dtos/attend_shift.dto';

@route('/attend_shifts')
export class AttendShiftController extends BaseController {
    constructor(private readonly attendShiftService: AttendShiftService)
    {
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        try{
            res.send(
                await this.attendShiftService.all()
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
            let result = await this.attendShiftService.find(id)
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
        check('shift_id').notEmpty(),
        validateFields
    ])
    public async create(req: Request, res: Response) {
        let auth = (req as any).auth;
        try{
            await this.attendShiftService.create({user_id: auth.id, shift_id: req.body.shift_id} as AttendShiftCreateDto);
            res.send();
        }catch (error){
            console.log("entro acá");
            this.handleException(error, res);
        }

    }

    @route('/:id')
    @PUT()
    @before([
        check('end').notEmpty(),
        check('tiempo').notEmpty(),
        check('status').notEmpty(),
        validateFields
    ])
    public async update(req: Request, res: Response) {
        try {
            const id = req.params.id;

            await this.attendShiftService.update(id, req.body as AttendShiftUpdateDto);

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
            await this.attendShiftService.remove(id);
            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }
}