import { ObjectId } from "mongodb";
import { BranchRepository } from "../../branch.repository";
import { IBranch } from "../../domain/branch";

import model from './models/branch.model';

export class BranchMongoRepository implements BranchRepository {

    public async all(): Promise<IBranch[]> {
        return await model.find();
    }

    public async find(id: String): Promise<IBranch | null> {
        return await model.findById(id);
    }

    public async create(entity: IBranch): Promise<any> {
        return await  model.create(entity);
    }

    public async update(id: string, entity: IBranch): Promise<any> {
        return await model.updateOne(
            { _id: new ObjectId(id) },
            {
              $set: entity,
              $currentDate: { lastModified: true }
            }
          );
    }

    public async delete(id: string): Promise<any> {
        let d = await  model.deleteOne(new ObjectId(id));
        return d;
    }
}