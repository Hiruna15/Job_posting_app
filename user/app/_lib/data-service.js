import mongoose from "mongoose";
import { connectMongoose } from "./mongoDb";
import JobsModel from "../_models/jobs";
// import JobsModel from "../../../admin/app/_models/jobs.js";

export async function getJobs(filter) {
  try {
    await connectMongoose();

    let jobs = [];

    if (typeof filter !== "object" || filter === "all") {
      jobs = await JobsModel.find({}).lean();
    }

    return jobs.map((job) => ({
      ...job,
      _id: job._id.toString(),
      admnistrator: job.admnistrator.toString(),
      createdAt: job.createdAt.toString(),
      updatedAt: job.updatedAt.toString(),
      questions: job.questions?.map((question) => ({
        ...question,
        _id: question._id?.toString(),
      })),
    }));
  } catch (err) {
    throw err;
  }
}

export async function getJob(jobId) {
  try {
    await connectMongoose();

    const job = await JobsModel.findById(jobId).lean();

    if (!job) throw new Error("Job not found");

    console.log(job);

    return {
      ...job,
      _id: job._id.toString(),
      admnistrator: job.admnistrator.toString(),
      createdAt: job.createdAt.toString(),
      updatedAt: job.updatedAt.toString(),
      questions: job.questions?.map((question) => ({
        ...question,
        _id: question._id?.toString(),
      })),
    };
  } catch (err) {
    throw err;
  }
}

// export async function getUser(email) {
//   try {
//     await connectMongoose();

//     const user = await UserModel.findOne({
//       email: email,
//     }).lean();

//     if (!user) {
//       return null;
//     }

//     return {
//       ...user,
//       _id: user._id.toString(),
//     };
//   } catch (err) {
//     throw err;
//   }
// }
