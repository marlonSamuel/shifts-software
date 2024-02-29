import { Schema, model } from 'mongoose';
import { IRole } from '../../../domain/role';

const RoleSchema = new Schema<IRole>({
    name: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

let _model = model('Role', RoleSchema);

export default _model;