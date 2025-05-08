import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const formData = await req.formData();
  const resume = formData.get("resume");
  const coverLetter = formData.get("coverLetter");

  console.log(resume);
  console.log(coverLetter);

  if (!resume) {
    return NextResponse.json(
      { error: "Resume file is required" },
      { status: 400 }
    );
  }

  const uploadFile = async (file, fileName) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "applications",
          resource_type: "auto",
          public_id: `${fileName}_${uuidv4()}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      );
      stream.pipe(uploadStream);
    });
  };

  try {
    const resumeUrl = await uploadFile(resume, "resume");
    let coverLetterUrl = null;

    // console.log(resumeUrl);

    if (coverLetter) {
      coverLetterUrl = await uploadFile(coverLetter, "coverLetter");
    }

    return NextResponse.json({ resumeUrl, coverLetterUrl }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Upload failed", details: err.message },
      { status: 500 }
    );
  }
}
