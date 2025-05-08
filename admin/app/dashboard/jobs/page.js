import JobsPageClient from "@/app/_components/JobsPageClient";
import { getJobs } from "@/app/_lib/data-service";

export const metadata = {
  title: "Jobs",
};

export default async function Page() {
  const jobs = await getJobs();

  // console.log(jobs);

  return <JobsPageClient jobs={jobs} />;
}
