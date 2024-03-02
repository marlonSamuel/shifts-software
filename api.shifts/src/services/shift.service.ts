import { ApplicationException } from "../common/exceptions/application.exception";
import { BranchController } from "../controllers/branch.controller";
import { ShiftCreateDto } from "../dtos/shift.dto";
import { BranchDepartmentRepository } from "./repositories/branchdepartment.repository";
import { DepartmentRepository } from "./repositories/department.repository";
import { IShift } from "./repositories/domain/shift";
import { ShiftRepository } from "./repositories/shift.repository";
const jwt = require('jsonwebtoken');

export class ShiftService {
    constructor(
        private readonly shiftRepository: ShiftRepository,
        private readonly branchDepartmentRepository: BranchDepartmentRepository
    ){}

    //función para generar número
    async generateNumber (branch_department_id: String) : Promise<String | null>{
        let number = "";
        let branch_department = await this.branchDepartmentRepository.find(branch_department_id);
        console.log(branch_department);
        if(!branch_department){
            return null;
        }
        let shifts = await this.shiftRepository.findByBranchAndDate(branch_department_id.toString(), new Date().toISOString().split('T')[0]);
        console.log(shifts.length);
        let count_shifts = (shifts.length+1).toString().padStart(1, "0");
        number=number+branch_department.code_suc+branch_department?.code_dep+count_shifts;

        return number;
    }

    public async all(): Promise<IShift[]> {
        return await this.shiftRepository.all();
    }

    public async find(id: String): Promise<IShift | null>{
        return await this.shiftRepository.find(id);
    }

    public async create(auth: any): Promise<any>{
        let number = await this.generateNumber(auth._branch_department);
        if(number === null){
            throw new ApplicationException('Sucursal no econtrada.'); 
        }
        let entity = {
            user_id: auth.id,
            branch_department_id: auth._branch_department,
            date: new Date().toISOString().split('T')[0],
            number: number
        }
        return await this.shiftRepository.create(entity as IShift);
    }

    public async update(id: string, entry: ShiftCreateDto): Promise<void> {
        let originalEntry = await this.shiftRepository.find(id);
        if (originalEntry) {
            await this.shiftRepository.update(id, entry as IShift);
        } else {
            throw new ApplicationException('Ticket not found.');
        }
    }

    public async remove(id: string): Promise<void> {
        await this.shiftRepository.delete(id);
    }
}