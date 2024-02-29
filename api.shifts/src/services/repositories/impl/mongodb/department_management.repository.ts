import { ObjectId } from "mongodb";

import model from './models/department_management.model';
import { IDepartmentManagment } from '../../domain/department_managment';
import { DepartmentManagementRepository } from "../../department_management.repository";

export class DepartmentManagementMongoRepository implements DepartmentManagementRepository {

    public async all(): Promise<IDepartmentManagment[]> {
        return await model.find();
    }

    public async find(id: String): Promise<IDepartmentManagment | null> {
        return await model.findById(id);
    }

    public async findByBranch(branch_id: string): Promise<IDepartmentManagment[] | null> {
        return await model.aggregate(
            [ { $match : { branch_id : new ObjectId(branch_id) } },
                { 
                    $lookup:
                    {
                      from: 'departments',
                      localField: 'department_id',
                      foreignField: '_id',
                      as: 'department'
                    }
                  },
                  {$unwind: '$department'},
                  {
                    $project:
                       {
                         department_id: "$department_id",
                         department: "$department.name"
                       }
                 } 
            ]
        );
    }

    public async create(entity: IDepartmentManagment[]): Promise<any> {
        console.log("llego al modelo");
        return await  model.insertMany(entity);
    }
}