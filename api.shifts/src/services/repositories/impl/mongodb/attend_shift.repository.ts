import { ObjectId } from "mongodb";

import model from './models/attend_shift.model';
import { AttendShiftRepository } from "../../attend_shift.repository";
import { IAttendShift } from "../../domain/attend_shift";

export class AttendShiftMongoRepository implements AttendShiftRepository {

    public async all(): Promise<IAttendShift[]> {
        return await model.find();
    }

    public async find(id: String): Promise<IAttendShift | null> {
        return await model.findById(id);
    }

    public async findByUserAndState(user_id:string,status:string): Promise<IAttendShift | null> {
        //return await model.findOne({user_id,status});
        let data = await model.aggregate(
            [ { $match : { user_id : new ObjectId(user_id), status: status } },
                { 
                    $lookup:
                    {
                      from: 'shifts',
                      localField: 'shift_id',
                      foreignField: '_id',
                      as: 'shift'
                    }
                  },
                  {$unwind: '$shift'},
                  {
                    $project:
                       {
                         window: "$window",
                         number: "$shift.number",
                         shift_id: "$shift._id",
                         createdAt: "$createdAt"
                       }
                 } 
            ]
        );
        if(data.length > 0){
            return data[0];
        }
        return null;
    }

    public async create(entity: IAttendShift): Promise<any> {
        return await  model.create(entity);
    }

    public async update(id: string, entity: IAttendShift): Promise<any> {
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