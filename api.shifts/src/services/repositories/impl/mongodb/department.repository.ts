import { DepartmentRepository } from "../../department.repository";
import { IDepartment } from "../../domain/department";

import model from './models/department.model';
import { ObjectId } from 'mongodb';

export class DepartmentMongoRepository implements DepartmentRepository {

    public async all(): Promise<IDepartment[]> {
        return await model.find();
    }

    public async find(id: String): Promise<IDepartment | null> {
        return await model.findById(id);
    }

    public async create(entity: IDepartment): Promise<any> {
        return await  model.create(entity);
    }

    public async update(id: string, entity: IDepartment): Promise<any> {
        return await model.updateOne(
            { _id: new ObjectId(id) },
            {
              $set: entity,
              $currentDate: { lastModified: true }
            }
          );

        //return await  model.updateOne(entity);
    }

    public async delete(id: string): Promise<any> {
        let d = await  model.deleteOne(new ObjectId(id));
        return d;
    }
}