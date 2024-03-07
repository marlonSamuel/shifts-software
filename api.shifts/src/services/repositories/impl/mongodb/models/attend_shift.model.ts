import { Schema, model } from 'mongoose';
import { IAttendShift } from '../../../domain/attend_shift';
import moment from 'moment';

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
        type: String,
        required: false
    },
    tiempo: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: true
    },
    window: {
        type: Number,
        required: false
    },
    createdAt: {
        type: String,
        default:  moment().format('YYYY-MM-DD HH:mm:ss')
    },
    updatedAt: {
        type: String,
        default:  moment().format('YYYY-MM-DD HH:mm:ss')
    }
},{
    timestamps: false
});

let _model = model('AttendShift', AttendShiftSchema);

export default _model;