import { ApplicationException } from "../common/exceptions/application.exception";
import { DepartmentCreateDto } from "../dtos/department.dto";
import { BranchDepartmentRepository } from "./repositories/branchdepartment.repository";
import { DepartmentRepository } from "./repositories/department.repository";
import { IDepartment } from "./repositories/domain/department";

export class DepartmentService {
    constructor(
        private readonly departmentRepository: DepartmentRepository,
        private readonly branchDepartmentRepository: BranchDepartmentRepository
    ){}

    public async all(): Promise<IDepartment[]> {
        return await this.departmentRepository.all();
    }

    public async find(id: String): Promise<IDepartment | null>{
        return await this.departmentRepository.find(id);
    }

    public async create(entity: DepartmentCreateDto): Promise<any>{
        return await this.departmentRepository.create(entity as IDepartment);
    }

    public async update(id: string, entry: DepartmentCreateDto): Promise<void> {
        let originalEntry = await this.departmentRepository.find(id);
        if (originalEntry) {
            await this.departmentRepository.update(id, entry as IDepartment);
        } else {
            throw new ApplicationException('Department not found.');
        }
    }

    public async remove(id: string): Promise<void> {
        console.log(id);
        let exists = await this.branchDepartmentRepository.findByDepartment(id);
        if(exists!.length > 0){
            throw new ApplicationException('No se puede eliminar área, porque ya está asociado una o mas sucursales');
        }
        await this.departmentRepository.delete(id);
    }
}