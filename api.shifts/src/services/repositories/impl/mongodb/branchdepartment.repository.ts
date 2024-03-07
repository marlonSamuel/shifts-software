import { ObjectId } from "mongodb";
import { BranchDepartmentRepository } from "../../branchdepartment.repository";
import { IBranchDepartment, IBranchDepartmentGet, IBranchDepartmentGetFind } from "../../domain/branchdepartment";

import model from './models/branchdepartment.model';

export class BranchDepartmentMongoRepository implements BranchDepartmentRepository {

    public async all(): Promise<IBranchDepartmentGetFind[]> {
        return await model.aggregate(
          [{ 
              $lookup:
                  {
                    from: 'departments',
                    localField: 'department_id',
                    foreignField: '_id',
                    as: 'department'
                  }
                },
                {$lookup:
                  {
                    from: "branches",
                    localField: "branch_id",
                    foreignField: "_id",
                    as: "branch"
                  }
                },
                {$unwind: '$department'},
                {$unwind: '$branch'},
                {
                  $project:
                     {
                       branch_id: "$branch_id",
                       department_id: "$department_id",
                       department: "$department.name",
                       branch: "$branch.name",
                       code_dep: "$department.code",
                       code_suc: "$branch.code"
                     }
               } 
          ]
      );
    }

    public async find(id: string): Promise<IBranchDepartmentGetFind | null> {
        let data = await model.aggregate(
            [ { $match : { _id : new ObjectId(id) } },
                { 
                    $lookup:
                    {
                      from: 'departments',
                      localField: 'department_id',
                      foreignField: '_id',
                      as: 'department'
                    }
                  },
                  {$lookup:
                    {
                      from: "branches",
                      localField: "branch_id",
                      foreignField: "_id",
                      as: "branch"
                    }
                  },
                  {$unwind: '$department'},
                  {$unwind: '$branch'},
                  {
                    $project:
                       {
                         branch_id: "$branch_id",
                         department_id: "$department_id",
                         department: "$department.name",
                         branch: "$branch.name",
                         code_dep: "$department.code",
                         code_suc: "$branch.code"
                       }
                 } 
            ]
        );
        console.log("data, ",data)
        if(data.length > 0){
            return data[0];
        }
        return null;
    }

    public async findByBranch(branch_id: string): Promise<IBranchDepartmentGet[] | null> {
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

    public async findByDepartment(department_id: string): Promise<IBranchDepartment[]> {
      return await model.find({department_id});
    }

    public async create(entity: IBranchDepartment[]): Promise<any> {
        return await  model.insertMany(entity);
    }
}