import mongoose, {Schema} from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },

    rebirths: {
        type: Number,
        required: [true, 'Rebirths is required'],
    },

    available: {
        type: Boolean,
        default: true,
    },

    userId: {
        type: String,
        unique: true,
        required: [true, 'UserId is required']
    },

    comprador: {
        type: Boolean,
        default: false,
    }
});


export const UserModel = mongoose.model('User', userSchema);