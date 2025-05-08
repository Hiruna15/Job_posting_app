import JobPageClient from "../_components/JobPageClient";
import { getJobs } from "../_lib/data-service";

export const metadata = {
  title: "Jobify - Jobs",
};

export default async function Page() {
  const jobs = await getJobs();

  return <JobPageClient jobs={jobs} />;
}
