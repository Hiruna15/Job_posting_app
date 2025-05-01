import CreateJobForm from "@/app/_components/CreateJobForm";

export const metadata = {
  title: "Create job",
};

export default function Page() {
  return (
    <div>
      <CreateJobForm mode="create" />
    </div>
  );
}
