import { IAttendShift } from "./domain/attend_shift";
import { IShift } from "./domain/shift";

export interface AttendShiftRepository {
    all(): Promise<IAttendShift[]>,
    find(id: String): Promise<IAttendShift | null>,
    findByUserAndState(user_id:string,state:string): Promise<IAttendShift | null>,
    findByBranchAndStatus(branch_id:string,date: string): Promise<IAttendShift[]>,
    create(entity: IAttendShift): Promise<any>,
    update(id: string, entity: IAttendShift): Promise<any>,
    delete(id: string): Promise<any>
}