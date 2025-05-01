"use client";

import { format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";

export default function JobCard({ job }) {
  const {
    _id: jobId,
    title,
    company,
    location,
    locationType,
    status,
    employmentType,
    salary,
    createdAt,
    updatedAt,
  } = job;

  const pathName = usePathname();
  const router = useRouter();

  return (
    <div>
      <div>
        <p>{title}</p>
        <p>{company}</p>
        {location && <p>{location}</p>}
        <p>{locationType}</p>
        <p>{employmentType}</p>
        {salary > 0 && <p>{salary}</p>}

        <p>Created: {format(new Date(createdAt), "PPP")}</p>

        {new Date(createdAt).getTime() !== new Date(updatedAt).getTime() && (
          <p>Updated: {format(new Date(updatedAt), "PPP")}</p>
        )}

        <p>{status}</p>
      </div>
      <div>
        <button onClick={() => router.push(`${pathName}/edit/${jobId}`)}>
          Edit
        </button>
        <button>Delete</button>
      </div>
    </div>
  );
}
