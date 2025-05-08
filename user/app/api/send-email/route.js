import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import axios from "axios";
import { Buffer } from "buffer";
import { connectMongoose } from "@/app/_lib/mongoDb";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connectMongoose();

    const db = mongoose.connection.db;

    const application = await req.json();

    const setting = await db.collection("system_settings").findOne({});
    const systemEmail = setting?.email;

    // console.log("System email:", systemEmail);

    if (!systemEmail) {
      return NextResponse.json(
        { error: "System email not configured" },
        { status: 500 }
      );
    }

    const downloadFile = async (url) => {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const contentDisposition = response.headers["content-disposition"] || "";
      const match = contentDisposition.match(/filename="?(.+)"?/);
      const filename = match?.[1] || "file";
      return {
        filename,
        content: Buffer.from(response.data, "binary"),
      };
    };

    const attachments = [];

    if (application.resumeUrl) {
      const resume = await downloadFile(application.resumeUrl);
      attachments.push({
        filename: "resume.pdf",
        content: resume.content,
      });

      //   console.log(resume);
    }

    if (application.coverLetterUrl) {
      const coverLetter = await downloadFile(application.coverLetterUrl);
      attachments.push({
        filename: "coverLetter.pdf",
        content: coverLetter.content,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Job App System" <${process.env.EMAIL_USER}>`,
      to: systemEmail,
      subject: "New Job Application Received",
      text: `A new job application was submitted.\n\nName: ${application.name}\nEmail: ${application.email}`,
      attachments,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
