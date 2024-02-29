import { ObjectId } from "mongodb";

import model from './models/user.model';
import { UserRepository } from "../../users.repository";
import { IUser } from "../../domain/user";

export class UserMongoRepository implements UserRepository {

    public async all(): Promise<IUser[]> {
        return await model.find();
    }

    public async find(id: String): Promise<IUser | null> {
        return await model.findById(id);
    }

    public async findByUsername(username: String): Promise<IUser | null> {
        return await model.findOne({username});
    }

    public async create(entity: IUser): Promise<any> {
        return await  model.create(entity);
    }

    public async update(id: string, entity: IUser): Promise<any> {
        return await model.updateOne(
            { _id: new ObjectId(id) },
            {
              $set: entity,
              $currentDate: { lastModified: true }
            }
          );
    }

    public async delete(id: string): Promise<any> {
        return await  model.deleteOne(new ObjectId(id));
    }
}