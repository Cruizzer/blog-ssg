import { Schema, model, models, Document } from 'mongoose';

interface IComment extends Document {
    postId: string;
    text: string;
    author: string;
    date: Date;
    profileImage?: string;
}

const commentSchema = new Schema<IComment>({
    postId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    profileImage: {
        type: String,
    },

});

const Comment = models.Comment || model<IComment>('Comment', commentSchema);

export default Comment;