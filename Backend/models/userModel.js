import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    history:[
        {
            code: {type: String, required: true},
            response: {type: String, required: true},
            date: {type: Date, default: Date.now}
        }
    ]
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;