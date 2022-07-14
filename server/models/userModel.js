import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique:true, match: /.+\@.+\..+/, unique: true},
  createdOn: {type: Date, default: Date.now, required: true}
})

const User = mongoose.model('User', userSchema)

export default User