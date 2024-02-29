import { IRole } from "./repositories/domain/role";
import { RoleRepository } from "./repositories/role.repository";

export class RoleService {
    constructor(
        private readonly roleRepository: RoleRepository
    ){}

    public async all(): Promise<IRole[]> {
        return await this.roleRepository.all();
    }
}