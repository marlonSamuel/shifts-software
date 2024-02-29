import { ObjectId } from "mongodb";
import { IManagementType } from "../../domain/management_type";
import { ManagementTypeRepository } from "../../management_type.repository";

import model from './models/management_type';

export class ManagementTypeMongoRepository implements ManagementTypeRepository {

    public async all(): Promise<IManagementType[]> {
        return await model.find();
    }

    public async find(id: String): Promise<IManagementType | null> {
        return await model.findById(id);
    }

    public async create(entity: IManagementType): Promise<any> {
        return await  model.create(entity);
    }

    public async update(entity: IManagementType): Promise<any> {
        return await  model.updateOne(entity);
    }

    public async delete(id: string): Promise<any> {
        let d = await  model.deleteOne(new ObjectId(id));
        return d;
    }
}