import { ApplicationException } from "../common/exceptions/application.exception";
import { UserCreateDto, UserUpdateDto } from "../dtos/user.dto";
import { BranchDepartmentRepository } from "./repositories/branchdepartment.repository";
import { IUser } from "./repositories/domain/user";
import { RoleRepository } from "./repositories/role.repository";
import { UserRepository } from "./repositories/users.repository";
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';

export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository,
        private readonly branchDepartmentRepository: BranchDepartmentRepository
    ){}

    public async all(): Promise<IUser[]> {
        return await this.userRepository.all();
    }

    public async find(id: String): Promise<IUser | null>{
        return await this.userRepository.find(id);
    }

    public async create(entity: UserCreateDto): Promise<any>{
        //TODO: encriptar contraseña
        const salt = bcrypt.genSaltSync();
        entity.password = bcrypt.hashSync( entity.password, salt );
        return await this.userRepository.create(entity as IUser);
    }

    public async update(id: string, entry: UserUpdateDto): Promise<void> {
        let originalEntry = await this.userRepository.find(id);
        if (originalEntry) {
            await this.userRepository.update(id, entry as IUser);
        } else {
            throw new ApplicationException('User not found.');
        }
    }

    public async disabled(id: string): Promise<void> {
        let originalEntry = await this.userRepository.find(id);
        if (originalEntry) {
            let entry : any = new Object(originalEntry);
            entry.disasbled = !originalEntry.disabled;
            delete entry._id;
            await this.userRepository.update(id, entry as IUser);
        } else {
            throw new ApplicationException('User not found.');
        }
    }


    public async authenticate(username: string, password: string): Promise<string> {
        let user = await this.userRepository.findByUsername(username);
        if(process.env.jwt_secret_key){
            const secretKey: string = process.env.jwt_secret_key;
            if(user){
                //validar el password
                const validPassword = bcrypt.compareSync( password, user.password);
                if(!validPassword){
                    throw new ApplicationException('Usuario o contraseña incorrectos');
                }
                //obtener departamento

                //obtener role
                let role = await this.roleRepository.find(user.role_id);
                let department = await this.branchDepartmentRepository.find(user.branch_department_id);

                return jwt.sign({
                    id: user._id,
                    name: user.name,
                    lastname: user.lastname,
                    role: role!.name,
                    department: department?.department,
                    branch: department?.branch,
                    department_id: department?.department_id,
                    branch_id: department?.branch_id,
                    branch_department_id: department?._id
                }, secretKey, { expiresIn: '15h', algorithm: 'HS256' });
            }else{
                throw new ApplicationException('Usuario o contraseña incorrectos');
            }
        }else{
            throw new ApplicationException('Secrete key no definida');
        }
    }
}