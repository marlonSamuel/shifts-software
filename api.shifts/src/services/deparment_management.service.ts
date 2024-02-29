import { DepartmentManagementCreateDto } from '../dtos/deparment_management.dto';
import { DepartmentManagementRepository } from "./repositories/department_management.repository";
import { IDepartmentManagment } from "./repositories/domain/department_managment";

export class DepartmentManagementService {
    constructor(
        private readonly deparmentManagementRepository: DepartmentManagementRepository
    ){}

    public async all(): Promise<IDepartmentManagment[]> {
        return await this.deparmentManagementRepository.all();
    }

    public async find(id: String): Promise<IDepartmentManagment | null>{
        return await this.deparmentManagementRepository.find(id);
    }

    public async create(entity: DepartmentManagementCreateDto): Promise<any>{
        let data_insert : IDepartmentManagment[] = [];
        entity.management_type_id.forEach(element => {
            data_insert.push({
                management_type_id: element,
                branch_department_id: entity.branch_department_id
            })
        });
        console.log(data_insert)
        return await this.deparmentManagementRepository.create(data_insert);
    }
}