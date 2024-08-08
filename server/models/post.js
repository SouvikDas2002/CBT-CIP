const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  id: { type: Number, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true }
});

const postSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], required: true },
  published_date: { type: Date, required: true },
  likes: { type: Number, required: true },
  picture:{type:String,required:false},
  comments: { type: [commentSchema], required: true }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
