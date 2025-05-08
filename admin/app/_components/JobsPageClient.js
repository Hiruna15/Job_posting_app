"use client";

import Link from "next/link";
import JobCard from "./JobCard";
import styled from "styled-components";
import { Poppins } from "next/font/google";
import PopupModel from "./PopupModel";
import CreateJobForm from "./CreateJobForm";
import { useState } from "react";
import { MdAddCircle } from "react-icons/md";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const tableColumns = [
  "Company",
  "Job type",
  "Role",
  "Emp type",
  "Applications",
  "Status",
];

const JobsPage = styled.div`
  height: 80%;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4em 0;
  gap: 2em;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const TableHead = styled.thead`
  color: rgba(0, 0, 0, 0.85);
  padding: 2em;
  margin-bottom: 2em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  th {
    font-weight: 400;
    font-size: 0.9em;
    padding: 1em;
    text-align: left;
  }
`;

const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
  border: none;

  tbody {
    font-size: 0.9em;
  }
`;

const CreateJobBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  background-color: #111111;
  padding: 1em;
  border-radius: 1em;
  font-size: 1.2em;
  cursor: pointer;
  /* margin-left: auto; */

  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #333333;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  button {
    border: none;
    background-color: transparent;
    color: #ffffff;
  }
`;

export default function JobsPageClient({ jobs }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [EditFormOpen, setEditFormOpen] = useState(false);
  const [EditFormJob, setEditFormJob] = useState({});

  return (
    <JobsPage className={poppins.className}>
      <div>
        <CreateJobBtn onClick={() => setModalOpen(true)}>
          <MdAddCircle color="#004bff" size={20} />
          <button>Create a new Job application</button>
        </CreateJobBtn>
      </div>

      {jobs.length === 0 ? (
        <Link href="/dashboard/jobs/new">Create a new Job application</Link>
      ) : (
        <Table>
          <TableHead>
            <tr>
              {tableColumns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </TableHead>

          <tbody>
            {jobs.map((job) => (
              <JobCard
                job={job}
                key={job._id}
                setEditFormOpen={setEditFormOpen}
                setEditFormJob={setEditFormJob}
              />
            ))}
          </tbody>
        </Table>
      )}

      <PopupModel isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <CreateJobForm mode="create" />
      </PopupModel>

      <PopupModel isOpen={EditFormOpen} onClose={() => setEditFormOpen(false)}>
        <CreateJobForm mode="edit" job={EditFormJob} />
      </PopupModel>
    </JobsPage>
  );
}
