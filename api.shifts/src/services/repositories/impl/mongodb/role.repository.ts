import { RoleRepository } from "../../role.repository";

import model from './models/role.model';
import { ObjectId } from 'mongodb';
import { IRole } from "../../domain/role";

export class RoleMongoRepository implements RoleRepository {

    public async all(): Promise<IRole[]> {
        return await model.find();
    }

    public async find(id: String): Promise<IRole | null> {
        return await model.findById(id);
    }

    public async create(entity: IRole): Promise<any> {
        return await  model.create(entity);
    }

    public async update(entity: IRole): Promise<any> {
        return await  model.updateOne(entity);
    }

    public async delete(id: string): Promise<any> {
        return await  model.deleteOne(new ObjectId(id));
    }
}