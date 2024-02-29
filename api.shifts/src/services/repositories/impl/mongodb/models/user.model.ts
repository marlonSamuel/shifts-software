import { Schema, model } from 'mongoose';
import { IUser } from '../../../domain/user';

const UserSchema = new Schema<IUser>({
    branch_department_id: {
        type: Schema.Types.ObjectId,
        ref:'BranchDepartment',
        required: true
    },
    role_id: {
        type: Schema.Types.ObjectId,
        ref:'Role',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    cui: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    cellphone: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

let _model = model('User', UserSchema);

export default _model;