import { connectMongoose } from "@/app/_lib/mongoDb";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export async function PUT(request) {
  try {
    const { applicationId, newStatus } = await request.json();

    if (!applicationId || !newStatus) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    await connectMongoose();
    const db = mongoose.connection.db;

    const result = await db
      .collection("applications")
      .updateOne(
        { _id: new ObjectId(applicationId) },
        { $set: { status: newStatus } }
      );

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({
          message: "Application not found or status unchanged",
          modifiedCount: result.modifiedCount,
        }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error updating status:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
