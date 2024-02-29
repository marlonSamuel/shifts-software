import { Schema, model } from 'mongoose';
import { IBranch } from '../../../domain/branch';

const BranchSchema = new Schema<IBranch>({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    dir: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

let _model = model('Branch', BranchSchema);

export default _model;