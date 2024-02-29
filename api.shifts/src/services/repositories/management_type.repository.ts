import { IDepartment } from "./domain/department";
import { IManagementType } from "./domain/management_type";

export interface ManagementTypeRepository {
    all(): Promise<IManagementType[]>,
    find(id: String): Promise<IManagementType | null>,
    create(entity: IManagementType): Promise<any>,
    update(entity: IManagementType): Promise<any>,
    delete(id: string): Promise<any>
}