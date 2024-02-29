import { ApplicationException } from "../common/exceptions/application.exception";
import { ManagementTypeCreateDto } from "../dtos/management_type.dto";
import { IManagementType } from "./repositories/domain/management_type";
import { ManagementTypeRepository } from "./repositories/management_type.repository";

export class ManagementTypeService {
    constructor(
        private readonly managementTypeRepository: ManagementTypeRepository
    ){}

    public async all(): Promise<IManagementType[]> {
        return await this.managementTypeRepository.all();
    }

    public async find(id: String): Promise<IManagementType | null>{
        return await this.managementTypeRepository.find(id);
    }

    public async create(entity: ManagementTypeCreateDto): Promise<any>{
        return await this.managementTypeRepository.create(entity as IManagementType);
    }

    public async update(id: string, entry: ManagementTypeCreateDto): Promise<void> {
        let originalEntry = await this.managementTypeRepository.find(id);
        if (originalEntry) {
            originalEntry.name = entry.name;
            await this.managementTypeRepository.update(originalEntry);
        } else {
            throw new ApplicationException('Management service not found.');
        }
    }

    public async remove(id: string): Promise<void> {
        await this.managementTypeRepository.delete(id);
    }
}