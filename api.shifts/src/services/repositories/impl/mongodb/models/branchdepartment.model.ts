import { Schema, model } from 'mongoose';
import { IBranch } from '../../../domain/branch';
import { IBranchDepartment } from '../../../domain/branchdepartment';

const BranchDepartmentSchema = new Schema<IBranchDepartment>({
    branch_id: {
        type: Schema.Types.ObjectId,
        ref:'Branch',
        required: true
    },
    department_id: {
        type: Schema.Types.ObjectId,
        ref:'Department',
        required: true
    }
},{
    timestamps: true
});

let _model = model('BranchDepartment', BranchDepartmentSchema);

export default _model;