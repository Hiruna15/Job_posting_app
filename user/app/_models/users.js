import mongoose from "mongoose";

const { Schema } = mongoose;

const usersSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
});

const UserModel =
  mongoose.models.User || mongoose.model("normalUser", usersSchema);
export default UserModel;
