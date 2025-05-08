import mongoose from "mongoose";

const { Schema, model } = mongoose;

const applicationsSchema = new Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  coverLetterUrl: {
    type: String,
  },
  answers: {
    type: [
      {
        question: {
          type: String,
          // required: false,
        },
        answer: {
          type: String,
          // required: false,
        },
      },
    ],
    default: [],
  },
  status: {
    type: String,
    enum: ["not reviewed", "selected", "rejected", "shortlisted"],
    default: "not reviewed",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ApplicationModel =
  mongoose.models.Application || model("Application", applicationsSchema);
export default ApplicationModel;
