import { Schema, model } from 'mongoose';
import { IUser } from '../../../domain/user';
import { IShift } from '../../../domain/shift';

const ShiftSchema = new Schema<IShift>({
    branch_department_id: {
        type: Schema.Types.ObjectId,
        ref:'BranchDepartment',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    number: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

let _model = model('Shift', ShiftSchema);

export default _model;