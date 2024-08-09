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
  published_date: { type: Date, default: Date.now }, // Set default if not provided
  likes: { type: Number, default: 0 }, // Default to 0 if not provided
  picture: { type: String, require: true },
   comments: { type: [commentSchema], default: [] } // Default to empty array
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
