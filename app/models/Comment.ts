import { Schema, model, models, Document, Types } from 'mongoose';

interface IComment extends Document {
    commentId: Types.ObjectId;
    postId: string;
    text: string;
    author: string;
    date: Date;
    profileImage?: string;
}

const commentSchema = new Schema<IComment>({
    commentId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
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
        default: Date.now,
        required: true,
    },
    profileImage: {
        type: String,
    },
}, { timestamps: true });

const Comment = models.Comment || model<IComment>('Comment', commentSchema);

export default Comment;
