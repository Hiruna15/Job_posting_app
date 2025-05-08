import { getServerSession } from "next-auth";
import AdminModel from "../_models/admin";
import JobsModel from "../_models/jobs";
import { connectMongoose } from "./mongoDb";
import { authOptions } from "../api/auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function getJobs() {
  await connectMongoose();

  // const session = await getServerSession(authOptions);
  // console.log(session);

  let jobs = await JobsModel.find({}).lean().sort({
    createdAt: -1,
  });

  const db = mongoose.connection.db;

  jobs = await Promise.all(
    jobs.map(async (job) => {
      const applications = await db
        .collection("applications")
        .countDocuments({ jobId: job._id });
      return { ...job, applications };
    })
  );

  const plainJobs = jobs.map((job) => makePlainObject(job));

  return plainJobs;
}

export async function getJobById(jobId) {
  await connectMongoose();

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  let job = await JobsModel.findOne({ _id: jobId }).lean();

  if (!job) return null;

  // const applications = await db
  //   .collection("applications")
  //   .countDocuments({ jobId: job._id });

  // job = { ...job, applications };

  const plainJob = makePlainObject(job);

  return plainJob;
}

export async function getAdminUsers() {
  await connectMongoose();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const admins = await AdminModel.find({ _id: { $ne: session.user.id } })
    .lean()
    .sort({ createdAt: -1 });

  const plainAdminObjs = admins.map((admin) => ({
    ...admin,
    _id: admin._id.toString(),
  }));

  // console.log(plainAdminObjs);

  return plainAdminObjs;
}

export async function getAdminUserEmails() {
  await connectMongoose();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const adminEmails = await AdminModel.find({}, { email: 1, _id: 0 }).lean();

  const emails = adminEmails.map((emailObj) => emailObj.email);

  return emails;
}

export async function getApplicationsByJobId(jobId) {
  await connectMongoose();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const db = mongoose.connection.db;
  const applications = await db
    .collection("applications")
    .find({ jobId: new mongoose.Types.ObjectId(jobId) })
    .toArray();

  const plainApplications = applications.map((application) => ({
    ...application,
    _id: application._id.toString(),
    jobId: application.jobId.toString(),
    createdAt: application.createdAt.toISOString(),
    answers: application.answers.map((answer) => ({
      ...answer,

      ...(answer._id && { _id: answer._id.toString() }),
    })),
  }));

  // console.log(plainApplications);

  return plainApplications;
}

function makePlainObject(obj) {
  return {
    ...obj,
    _id: obj._id?.toString(),
    admnistrator: obj.admnistrator?.toString(),
    createdAt: obj.createdAt?.toISOString(),
    updatedAt: obj.updatedAt?.toISOString(),
    questions: obj.questions?.map((question) => ({
      ...question,
      _id: question._id?.toString(),
    })),
  };
}
