import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User',required: true},
  active: {type: Boolean, required: true, default: true},
  createdOn: {type: Date, default: Date.now, required: true},
  updatedOn: {type: Date, default: Date.now, required: true}
})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog