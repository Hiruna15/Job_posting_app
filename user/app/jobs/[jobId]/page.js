import JobApplyPageClient from "@/app/_components/JobApplyPageClient";
import { getJob } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { jobId } = await params;

  const job = await getJob(jobId);

  return <JobApplyPageClient job={job} />;
}
