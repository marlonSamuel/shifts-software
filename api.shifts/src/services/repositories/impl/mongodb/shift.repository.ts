import { ObjectId } from "mongodb";

import model from './models/shift.model';
import { ShiftRepository } from "../../shift.repository";
import { IShift } from "../../domain/shift";

export class ShiftMongoRepository implements ShiftRepository {

    public async all(): Promise<IShift[]> {
        return await model.find();
    }

    public async find(id: String): Promise<IShift | null> {
        return await model.findById(id);
    }

    public async findByBranchAndDate(branch_department_id:string, date:string) : Promise<any> {
        return await model.find({branch_department_id,date})
    }

    public async findByBranchAndDateStatus(branch_department_id:string, date:string,status=false) : Promise<any> {
        return await model.find({branch_department_id,date,status})
    }

    public async findByBranch(branch_id:string, date:string,status=false) : Promise<any> {
        return await model.aggregate(
            [ { $match : { branch_id : new ObjectId(branch_id), date: date, status: status } },
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
                         number: "$number",
                         department_id: "$department_id",
                         department: "$department.name",
                         date: "$date"
                       }
                 } 
            ]
        );

        //return await model.find({branch_id,date,status})
    }

    public async create(entity: IShift): Promise<any> {
        return await  model.create(entity);
    }

    public async update(id: string, entity: IShift): Promise<any> {
        return await model.updateOne(
            { _id: new ObjectId(id) },
            {
              $set: entity,
              $currentDate: { lastModified: true }
            }
          );
    }

    public async getByStatusAndDate(date: string, status:Boolean){
        return await model.find({date,status});
    }

    public async delete(id: string): Promise<any> {
        return await  model.deleteOne(new ObjectId(id));
    }
}