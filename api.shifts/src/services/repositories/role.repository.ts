import { IDepartment } from "./domain/department";
import { IRole } from "./domain/role";

export interface RoleRepository {
    all(): Promise<IRole[]>,
    find(id: String): Promise<IRole | null>,
    create(entity: IRole): Promise<any>,
    update(entity: IRole): Promise<any>,
    delete(id: string): Promise<any>
}