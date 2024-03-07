import { BranchDepartmentCreateDto } from "../dtos/branchdepartment.dto";
import { BranchDepartmentRepository } from "./repositories/branchdepartment.repository";
import { IBranchDepartment, IBranchDepartmentGet } from "./repositories/domain/branchdepartment";

export class BranchDepartmentService {
    constructor(
        private readonly branchDepartmentRepository: BranchDepartmentRepository
    ){}

    public async all(): Promise<IBranchDepartment[]> {
        console.log("entro departmentos")
        return await this.branchDepartmentRepository.all();
    }

    public async find(id: String): Promise<IBranchDepartment | null>{
        return await this.branchDepartmentRepository.find(id);
    }

    public async findByBranch(branch_id: string): Promise<IBranchDepartmentGet[] | null>{
        return await this.branchDepartmentRepository.findByBranch(branch_id);
    }

    public async create(entity: BranchDepartmentCreateDto): Promise<any>{
        //return await this.branchDepartmentRepository.create(entity as IBranchDepartment);
    }
}