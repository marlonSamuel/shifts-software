import { Schema, model } from 'mongoose';
import { IDepartment } from '../../../domain/department';
import { IManagementType } from '../../../domain/management_type';

const ManagementTypeSchema = new Schema<IManagementType>({
    name: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

let _model = model('ManagementType', ManagementTypeSchema);

export default _model;