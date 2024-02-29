import { ApplicationException } from "../common/exceptions/application.exception";
import { DepartmentCreateDto } from "../dtos/department.dto";
import { DepartmentRepository } from "./repositories/department.repository";
import { IDepartment } from "./repositories/domain/department";

export class DepartmentService {
    constructor(
        private readonly departmentRepository: DepartmentRepository
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
        await this.departmentRepository.delete(id);
    }
}