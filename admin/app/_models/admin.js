import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const adminSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    min: [4, "username must have at least 4 characters"],
    max: [20, "user cannot have more than 20 characters"],
  },
  role: {
    type: String,
    enum: { values: ["normal", "super"], message: "{VALUE} is not supported" },
    default: "normal",
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password haven't been provided"],
    // match: [passwordRegex, "The password is not a strong one"],
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

const AdminModel = mongoose.models.User || mongoose.model("User", adminSchema);
export default AdminModel;
