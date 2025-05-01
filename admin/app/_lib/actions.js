"use server";

import { getServerSession } from "next-auth";
import JobsModel from "../_models/jobs";
import { connectMongoose } from "./mongoDb";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function createJob(formData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await connectMongoose();

    await JobsModel.create({ ...formData, admnistrator: session.user.id });
  } catch (err) {
    throw err;
  }
}
