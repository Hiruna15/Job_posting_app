import mongoose from "mongoose";

const { Schema, model } = mongoose;

const settingsSchema = new Schema({
  phoneNumber: {
    type: String,
    required: [true, "System phone number is required"],
    match: [/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number"],
    minlength: [10, "Phone number must be at least 10 characters long"],
    maxlength: [15, "Phone number must not exceed 15 characters"],
  },
  email: {
    type: String,
    required: [true, "System email is required"],
    match: [
      /^(?:[a-zA-Z0-9_'^&\/+-])+(?:\.(?:[a-zA-Z0-9_'^&\/+-]+))*@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/,
      "Please provide a valid email address",
    ],
  },
});

const SystemSettingsModel =
  mongoose.models.Job || model("System_setting", settingsSchema);

export default SystemSettingsModel;
