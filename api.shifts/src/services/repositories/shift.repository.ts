import { IShift } from "./domain/shift";

export interface ShiftRepository {
    all(): Promise<IShift[]>,
    find(id: String): Promise<IShift | null>,
    findByBranchAndDate(branch_department_id:string, date:string) : Promise<any>,
    create(entity: IShift): Promise<any>,
    update(id: string, entity: IShift): Promise<any>,
    delete(id: string): Promise<any>
}