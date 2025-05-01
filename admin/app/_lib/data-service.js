import JobsModel from "../_models/jobs";
import { connectMongoose } from "./mongoDb";

export async function getJobs() {
  await connectMongoose();

  const jobs = await JobsModel.find({ isDeleted: false }).lean().sort({
    createdAt: -1,
  });

  const plainJobs = jobs.map((job) => makePlainObject(job));

  //   console.log(plainJobs);
  return plainJobs;
}

export async function getJobById(jobId) {
  await connectMongoose();

  // Artificial delay for testing (e.g., 2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const job = await JobsModel.findOne({ _id: jobId }).lean();

  if (!job) return null;

  const plainJob = makePlainObject(job);

  return plainJob;
}

function makePlainObject(obj) {
  return {
    ...obj,
    _id: obj._id?.toString(),
    admnistrator: obj.admnistrator?.toString(),
    createdAt: obj.createdAt?.toISOString(),
    updatedAt: obj.updatedAt?.toISOString(),
  };
}
