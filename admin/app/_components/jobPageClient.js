"use client";

import styled from "styled-components";
import ApplicantCard from "./ApplicantCard";
import { Poppins } from "next/font/google";
import { useState } from "react";
import PopupModel from "./PopupModel";
import ApplicationView from "./ApplicationView";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const columns = [
  "Name",
  "Email",
  "Resume",
  "Cover Letter",
  "Applied",
  "Status",
  "",
];

const JobPageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  flex: 1;
  overflow-y: auto;
  padding: 1em;
  /* position: relative; */
`;

const ApplicationsContainer = styled.div`
  width: 92%;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  > div {
    display: flex;
    align-items: center;
    gap: 1em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.22);
    padding-bottom: 0.4em;
    color: #111111;

    > span:nth-child(2) {
      color: #0543ff;
    }
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  border: none;
  th {
    font-weight: 400;
    color: rgba(0, 0, 0, 0.62);
    text-align: left;
    font-size: 0.85em;
    padding: 1em;
  }
`;

const Tbody = styled.tbody`
  font-size: 0.8em;
  color: #111111;

  tr {
    background-color: #ededed;
    border-bottom: 1em solid #ffffff;
    border-left: 0.2em solid #004bff;
  }

  td {
    border-collapse: collapse;
    border: none;
    padding: 1em 2em;
  }
`;

export default function JobPageClient({ job, applications }) {
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState({});

  return (
    <JobPageContainer className={poppins.className}>
      <div></div>

      <ApplicationsContainer>
        <div>
          <span>Applications List</span>
          <span>{applications.length}</span>
        </div>

        {applications.length ? (
          <Table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>

            <Tbody>
              {applications.map((application) => (
                <ApplicantCard
                  key={application._id}
                  application={application}
                  setModelOpen={setModelOpen}
                  setSelectedApplication={setSelectedApplication}
                />
              ))}
            </Tbody>
          </Table>
        ) : (
          <di>
            <span>No Applications found for this job</span>
          </di>
        )}
      </ApplicationsContainer>

      <PopupModel isOpen={modelOpen} onClose={() => setModelOpen(false)}>
        <ApplicationView role={job.title} application={selectedApplication} />
      </PopupModel>
    </JobPageContainer>
  );
}
