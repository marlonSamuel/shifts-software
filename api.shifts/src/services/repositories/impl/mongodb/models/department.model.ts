import { Schema, model } from 'mongoose';
import { IDepartment } from '../../../domain/department';

const DepartmentSchema = new Schema<IDepartment>({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

let _model = model('Department', DepartmentSchema);

export default _model;