import JobCard from "@/app/_components/JobCard";
import { getJobs } from "@/app/_lib/data-service";
import Link from "next/link";

export const metadata = {
  title: "Jobs",
};

export default async function Page() {
  const jobs = await getJobs();

  return (
    <div>
      <div>
        {jobs.length === 0 ? (
          <Link href="/dashboard/jobs/new">Create a new Job application</Link>
        ) : (
          jobs.map((job) => <JobCard job={job} key={job._id} />)
        )}
      </div>
    </div>
  );
}
