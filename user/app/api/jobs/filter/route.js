import { connectMongoose } from "@/app/_lib/mongoDb";
import JobsModel from "@/app/_models/jobs";

export async function POST(request) {
  await connectMongoose();

  try {
    const { location, type } = await request.json();

    const filterQuery = { isDeleted: false };

    if (location && location !== "All") {
      if (location === "Remote") {
        filterQuery.locationType = "remote";
      } else if (location === "Hybrid") {
        filterQuery.locationType = "hybrid";
      } else if (location === "On-Site") {
        filterQuery.locationType = "on-site";
      }
    }

    if (type && type !== "All") {
      const typeMapping = {
        "Full time": "full-time",
        "Part time": "part-time",
        Contract: "contract",
        Internship: "internship",
      };
      filterQuery.employmentType = typeMapping[type];
    }

    const jobs = await JobsModel.find(filterQuery).lean();

    await new Promise((resolve) => setTimeout(resolve, 1500)); //////

    return Response.json({
      success: true,
      data: jobs.map((job) => ({
        ...job,
        _id: job._id.toString(),
        admnistrator: job.admnistrator.toString(),
        createdAt: job.createdAt.toISOString(),
        updatedAt: job.updatedAt.toISOString(),
      })),
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
