import mongoose from "mongoose";

const { Schema, model } = mongoose;

const jobsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    company: {
      type: String,
      required: [true, "company name is required"],
    },
    location: {
      type: String,
      required: function () {
        return this.locationType !== "remote";
      },
    },
    locationType: {
      type: String,
      enum: {
        values: ["remote", "on-site", "hybrid"],
        message: "{VALUE} is not supported",
      },
      default: "on-site",
    },
    status: {
      type: String,
      enum: {
        values: ["open", "closed"],
        message: "{VALUE} is not supported",
      },
      default: "open",
    },
    employmentType: {
      type: String,
      enum: {
        values: ["full-time", "part-time", "contract", "internship"],
        message: "{VALUE} is not supported",
      },
      default: "full-time",
    },
    salary: {
      type: Number,
      required: true,
    },
    admnistrator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const JobsModel = mongoose.models.Job || model("Job", jobsSchema);
export default JobsModel;
