import { Request, Response } from 'express';
import {route, GET, POST} from 'awilix-express';
import { BranchService } from '../services/branch.service';
import { BranchCreateDto } from '../dtos/branch.dto';
import { BaseController } from '../common/controllers/base.controller';
import { BranchDepartmentService } from '../services/branchdepartment.service';

@route('/branches/departments')
export class BranchDepartmentsController extends BaseController {
    constructor(private readonly branchDepartmentService: BranchDepartmentService)
    {
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        try{
            res.send(
                await this.branchDepartmentService.all()
            );
        }catch (error){
            this.handleException(error, res);
        }
    }

    /*@route('/:id')
    @GET()
    public async find(req: Request, res: Response) {
        try{
            const id = req.params.id;
            let result = await this.branchDepartmentService.find(id)
            if (result) {
                res.send(result);
            } else {
                res.status(404);
                res.send();
            }
        }catch (error){
            this.handleException(error, res);
        }

    }*/

    @route('/:branch_id')
    @GET()
    public async findByBranch(req: Request, res: Response) {
        try{
            const branch_id = req.params.branch_id;
            let result = await this.branchDepartmentService.findByBranch(branch_id)
            res.send(result);
        }catch (error){
            this.handleException(error, res);
        }

    }

}