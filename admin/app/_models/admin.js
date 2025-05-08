import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const adminSchema = new Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password haven't been provided"],
    match: [passwordRegex, "The password is not a strong one"],
  },
  role: {
    type: String,
    enum: { values: ["normal", "super"], message: "{VALUE} is not supported" },
    default: "normal",
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const AdminModel = mongoose.models.User || mongoose.model("User", adminSchema);
export default AdminModel;
