import { Schema, model } from 'mongoose';
import { IUser } from '../../../domain/user';
import { IShift } from '../../../domain/shift';
import moment from 'moment';

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
    branch_id: {
        type: Schema.Types.ObjectId,
        ref:'Branch',
        required: true
    },
    department_id: {
        type: Schema.Types.ObjectId,
        ref:'Department',
        required: true
    },
    number: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: moment().format('YYYY-MM-DD')
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