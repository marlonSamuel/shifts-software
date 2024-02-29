import { IDepartmentManagment } from "./domain/department_managment";

export interface DepartmentManagementRepository {
    all(): Promise<IDepartmentManagment[]>,
    find(id: String): Promise<IDepartmentManagment | null>,
    findByBranch(branch_id: string): Promise<IDepartmentManagment[] | null>,
    create(entity: IDepartmentManagment[]): Promise<any>
}