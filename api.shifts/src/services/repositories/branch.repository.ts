import { IBranch } from "./domain/branch";

export interface BranchRepository {
    all(): Promise<IBranch[]>,
    find(id: String): Promise<IBranch | null>,
    create(entity: IBranch): Promise<any>,
    update(id: string, entity: IBranch): Promise<any>,
    delete(id: string): Promise<any>,
}