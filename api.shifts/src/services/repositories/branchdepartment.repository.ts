import { IBranchDepartment, IBranchDepartmentGet, IBranchDepartmentGetFind } from "./domain/branchdepartment";

export interface BranchDepartmentRepository {
    all(): Promise<IBranchDepartment[]>,
    find(id: String): Promise<IBranchDepartmentGetFind | null>,
    findByBranch(branch_id: string): Promise<IBranchDepartmentGet[] | null>,
    create(entity: IBranchDepartment[]): Promise<any>
}