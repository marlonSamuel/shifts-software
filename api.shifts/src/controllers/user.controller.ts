import { Request, Response } from 'express';
import {route, GET, POST, PUT, DELETE, before} from 'awilix-express';
import { BaseController } from '../common/controllers/base.controller';
import { check } from 'express-validator';
import {validateFields} from '../common/midlewares/validate_fields.midleware';
import { UserService } from '../services/user.service';
import { UserCreateDto, UserUpdateDto } from '../dtos/user.dto';

@route('/users')
export class UserController extends BaseController {
    constructor(private readonly userService: UserService)
    {
        super();
    }

    
    @route('/login')
    @POST()
    @before([
        check('username').notEmpty(),
        check('password').notEmpty(),
        validateFields
    ])
    public async login(req: Request, res: Response) {
        try{
            let response = await this.userService.authenticate(req.body.username, req.body.password);
            res.send({
                ok: true,
                token: response
            });
        }catch (error){
            this.handleException(error, res);
        }
    }

    @GET()
    public async all(req: Request, res: Response) {
        try{
            res.send(
                await this.userService.all()
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
            let result = await this.userService.find(id)
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
        check('role_id').notEmpty(),
        check('name').notEmpty(),
        check('lastname').notEmpty(),
        check('cui').notEmpty(),
        check('username').notEmpty(),
        check('password').notEmpty(),
        check('cellphone').notEmpty(),
        validateFields
    ])
    public async create(req: Request, res: Response) {
        try{
            await this.userService.create(req.body as UserCreateDto);
            res.send();
        }catch (error){
            console.log("entro acá");
            this.handleException(error, res);
        }

    }

    @route('/:id')
    @PUT()
    @before([
        check('role_id').notEmpty(),
        check('name').notEmpty(),
        check('lastname').notEmpty(),
        check('cui').notEmpty(),
        check('username').notEmpty(),
        check('cellphone').notEmpty(),
        validateFields
    ])
    public async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await this.userService.update(id, req.body as UserUpdateDto);

            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/window/:id')
    @PUT()
    @before([
        check('window').notEmpty(),
        check('status').notEmpty(),
        check('branch_department_id').notEmpty(),
        validateFields
    ])
    public async updateWindow(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await this.userService.update(id, req.body as UserUpdateDto);
            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }
}