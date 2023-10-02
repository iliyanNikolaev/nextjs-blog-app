import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String },
    desc: { type: String, required: true },
    owner: { type: String, required: true },
    text: { type: String, required: true }
});

const Post = models.Post || model('Post', postSchema);

export default Post;