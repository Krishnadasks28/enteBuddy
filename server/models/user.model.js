import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    mobile: {
      type: String,
      required: true,
      unique:true
    },
  },
  { timestamps: true }
);

const User = mongoose.model('userdatas',userSchema)

export default User