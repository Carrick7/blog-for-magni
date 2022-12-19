import mongoose from 'mongoose';

const testSchema = new mongoose.Schema(
    {
        name: {type: String, lowercase: true, required: true},
        email: {type: String, lowercase: true, required: true}
    },
    {
        timestamps: true
    }
);

const Test = mongoose.models.Test || mongoose.model('Test', testSchema);

export default Test;
