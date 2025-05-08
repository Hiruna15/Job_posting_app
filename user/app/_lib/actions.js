"use server";

import ApplicationModel from "../_models/applications";
import { connectMongoose } from "./mongoDb";

export async function saveApplication(formData) {
  await connectMongoose();

  const application = {
    jobId: formData.jobId,
    name: formData.name,
    email: formData.email,
    resumeUrl: formData.resume,
    coverLetterUrl: formData.coverLetter,
    answers: formData.answers,
  };

  let newApplication = await ApplicationModel.create(application);

  newApplication = await ApplicationModel.findById(newApplication._id).lean();

  // console.log(newApplication);

  return {
    ...newApplication,
    _id: newApplication._id.toString(),
    jobId: newApplication.jobId.toString(),
    createdAt: newApplication.createdAt.toString(),
    answers: newApplication.answers.map((answer) => ({
      ...answer,

      ...(answer._id && { _id: answer._id.toString() }),
    })),
  };
}
