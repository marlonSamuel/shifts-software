import { IDepartment } from "./domain/department";

export interface DepartmentRepository {
    all(): Promise<IDepartment[]>,
    find(id: String): Promise<IDepartment | null>,
    create(entity: IDepartment): Promise<any>,
    update(id: string, entity: IDepartment): Promise<any>,
    delete(id: string): Promise<any>
}