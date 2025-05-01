import CreateJobForm from "@/app/_components/CreateJobForm";
import { getJobById } from "@/app/_lib/data-service";

export const metadata = {
  title: "Edit Job",
};

export default async function Page({ params }) {
  const { jobId } = await params;

  const job = await getJobById(jobId);

  return (
    <div>
      <h1>Edit Job #{jobId}</h1>
      <CreateJobForm mode="edit" job={job} />
    </div>
  );
}
