import { connectMongoose } from "@/app/_lib/mongoDb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const { id: applicationId, jobId } = await req.json();

  const db = mongoose.connection.db;
  await connectMongoose();

  const applications = db.collection("applications");
  const result = await applications.deleteOne({
    _id: new mongoose.Types.ObjectId(applicationId),
  });

  if (result.deletedCount === 0) {
    return NextResponse.json(
      { success: false, message: "Application not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
