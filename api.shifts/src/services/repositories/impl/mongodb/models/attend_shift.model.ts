import { Schema, model } from 'mongoose';
import { IAttendShift } from '../../../domain/attend_shift';

const AttendShiftSchema = new Schema<IAttendShift>({
    shift_id: {
        type: Schema.Types.ObjectId,
        ref:'BranchDepartment',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    end: {
        type: Date,
        required: false
    },
    tiempo: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: true
    }
},{
    timestamps: true
});

let _model = model('AttendShift', AttendShiftSchema);

export default _model;