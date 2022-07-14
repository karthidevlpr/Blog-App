import mongoose from "mongoose";

const Schema = mongoose.Schema;


const commentSchema = mongoose.Schema({
  comment: {type: String, required: true},
  blog: {type: Schema.Types.ObjectId, ref: 'Blog',required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User',required: true},
  createdOn: {type: Date, default: Date.now, required: true},
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment