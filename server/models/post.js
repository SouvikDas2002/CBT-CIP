const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  author: { type: String},
  content: { type: String },
  date: { type: Date }
});

const postSchema = new Schema({
  id: { type: String,require:true},
  title: { type: String, require: true},
  author: { type: String, require: true },
  content: { type: String, require: true },
  tags: { type: [String], require: true },
  published_date: { type: Date, default: Date.now }, 
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  picture: { type: String, require: true },
   comments: { type: [commentSchema], default: [] }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
