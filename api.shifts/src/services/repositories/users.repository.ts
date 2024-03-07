import { IUser } from "./domain/user";

export interface UserRepository {
    all(): Promise<IUser[]>,
    find(id: String): Promise<IUser | null>,
    findByUsername(username: String): Promise<IUser | null>,
    findByCui(cui: String): Promise<IUser | null>,
    findByWindow(branch_department_id: string, window: number): Promise<IUser | null>,
    create(entity: IUser): Promise<any>,
    update(id: string, entity: IUser): Promise<any>,
    delete(id: string): Promise<any>
}