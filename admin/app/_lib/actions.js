"use server";

import { getServerSession } from "next-auth";
import JobsModel from "../_models/jobs";
import { connectMongoose } from "./mongoDb";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import AdminModel from "../_models/admin";
import ApplicationModel from "../_models/applications";

export async function createJob(formData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await connectMongoose();

    await JobsModel.create({ ...formData, admnistrator: session.user.id });

    revalidatePath("/dashboard/jobs");
  } catch (err) {
    throw new Error("Failed to create job. Please try again later.");
  }
}

export async function editJob(formData, jobId) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await connectMongoose();

    await JobsModel.findByIdAndUpdate(jobId, formData, { runValidators: true });

    revalidatePath("/dashboard/jobs");
  } catch (err) {
    throw new Error("Failed to edit job. Please try again later.");
  }
}

export async function deleteJob(jobId) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await connectMongoose();

    await JobsModel.findByIdAndDelete(jobId);

    revalidatePath("/dashboard/jobs");
  } catch (err) {
    throw new Error("Failed to delete job. Please try again later.");
  }
}

export async function createAdminUser(formData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await connectMongoose();

    await AdminModel.create(formData);

    revalidatePath("/dashboard/users");
  } catch (err) {
    throw new Error("Failed to create job. Please try again later.");
  }
}

export async function editApplicationStatus(applicationId, newStatus) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await ApplicationModel.findByIdAndUpdate(
      applicationId,
      { status: newStatus },
      { runValidators: true }
    );

    revalidatePath("/dashboard/jobs");
  } catch (error) {
    throw new Error("Failed to Update the job application");
  }
}

export async function triggerRevalidate(path) {
  revalidatePath(path);
}
