import mongoose, { Schema, model, Document } from 'mongoose';

interface IComment extends Document {
    page: string;
    text: string;
    authorId: string;
    date: Date;
}

const commentSchema = new Schema<IComment>({
    page: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    authorId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },

});

const Comment = mongoose.models.Comment || model<IComment>('Comment', commentSchema);

export default Comment;