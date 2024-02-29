import { ApplicationException } from "../common/exceptions/application.exception";
import { BranchCreateDto } from "../dtos/branch.dto";
import { BranchRepository } from "./repositories/branch.repository";
import { BranchDepartmentRepository } from "./repositories/branchdepartment.repository";
import { DepartmentRepository } from "./repositories/department.repository";
import { IBranch } from "./repositories/domain/branch";
import { IBranchDepartment } from './repositories/domain/branchdepartment';
import { IDepartment } from "./repositories/domain/department";

export class BranchService {
    constructor(
        private readonly branchRepository: BranchRepository,
        private readonly departmentRepository: DepartmentRepository,
        private readonly branchDepartmentRepository: BranchDepartmentRepository
    ){}

    public async all(): Promise<IBranch[]> {
        return await this.branchRepository.all();
    }

    public async find(id: String): Promise<IBranch | null>{
        return await this.branchRepository.find(id);
    }

    public async create(entity: BranchCreateDto): Promise<any>{
        let inserted = await this.branchRepository.create(entity as IBranch);
        let departments = await this.departmentRepository.all();
        let branches_departments: IBranchDepartment[] = [];
        if(departments.length > 0){
            departments.forEach(element => {
                branches_departments.push({
                    department_id: element._id,
                    branch_id: inserted._id
                });
            });
            console.log(branches_departments);
            this.branchDepartmentRepository.create(branches_departments);
        }
        return inserted;
    }

    public async update(id: string, entry: BranchCreateDto): Promise<void> {
        let originalEntry = await this.branchRepository.find(id);
        if (originalEntry) {
            await this.branchRepository.update(id,entry as IBranch);
        } else {
            throw new ApplicationException('Branch not found.');
        }
    }

    public async remove(id: string): Promise<void> {
        await this.branchRepository.delete(id);
    }
}