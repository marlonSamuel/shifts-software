import { Schema, model } from 'mongoose';
import { IDepartmentManagment } from '../../../domain/department_managment';

const DepartmentManagementSchema = new Schema<IDepartmentManagment>({
    management_type_id: {
        type: Schema.Types.ObjectId,
        ref:'Branch',
        required: true
    },
    branch_department_id: {
        type: Schema.Types.ObjectId,
        ref:'Department',
        required: true
    }
},{
    timestamps: true
});

let _model = model('DepartmentManagement', DepartmentManagementSchema);

export default _model;