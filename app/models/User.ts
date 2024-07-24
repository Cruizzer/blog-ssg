import { Schema, model, models, Document } from 'mongoose';

interface IUser extends Document {
    email: string;
    name: string;
    image: string;
    numPosts: number;
    admin?: boolean;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    numPosts: {
        type: Number,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    
},{ timestamps: true});

const User = models.User || model<IUser>('User', userSchema);

export default User;
