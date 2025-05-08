import JobPageClient from "@/app/_components/jobPageClient";
import { getApplicationsByJobId, getJobById } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { jobId } = await params;

  const [job, applications] = await Promise.all([
    getJobById(jobId),
    getApplicationsByJobId(jobId),
  ]);

  // console.log(applications);

  return <JobPageClient job={job} applications={applications} />;
}
