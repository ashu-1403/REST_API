import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  pages:[{type:mongoose.Types.ObjectId,ref:"Page",required:"true"}],
});

export default mongoose.model("User", userSchema);
