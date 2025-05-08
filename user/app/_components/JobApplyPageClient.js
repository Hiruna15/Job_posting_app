"use client";

import { useState } from "react";
import ApplyForm from "./ApplyForm";
import JobDescription from "./JobDescription";
import PopupModel from "./PopupModel";
import { formatDistanceToNow } from "date-fns";
import styled from "styled-components";
import { FaCircleArrowRight } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";

const Main = styled.main`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3em;
  font-size: 0.95em;

  > div:nth-child(2) {
    width: 40%;
    min-height: 20em;
    background-color: #ececec;
  }
`;

const DetailsDiv = styled.div`
  width: 35%;
  min-height: 20em;
  background-color: #ececec;
  padding: 2em 3em;
  border-radius: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  position: relative;

  > div {
    display: flex;
    gap: 2em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.19);
    padding-bottom: 0.5em;

    > span:nth-child(1) {
      color: rgba(0, 0, 0, 0.68);
      font-size: 0.9em;
    }
  }

  > div:last-child {
    > span:nth-child(2) {
      font-size: 0.9em;
      color: rgb(2, 56, 253);
    }
  }
`;

const TypesDiv = styled.div`
  > div {
    display: flex;
    align-items: center;
    gap: 1em;

    div {
      font-size: 0.8em;
      color: #ffffff;
      background-color: #111111;
      padding: 0.5em 1em;
      border-radius: 0.5em;
    }
  }
`;

const AppyBtn = styled.div`
  position: absolute;
  background-color: #111111;
  display: flex;
  padding: 0.1em 2em;
  cursor: pointer;
  align-items: center;
  border-radius: 1em;
  color: white;
  bottom: -5em;
  right: 0;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #333333;
    transform: scale(1.05);
  }
`;

const DescriptionDiv = styled.div`
  padding: 2em 3em;
  border-radius: 2em;
  max-height: 22em;
  overflow-y: auto;

  > span {
    color: rgba(0, 0, 0, 0.74);
    border-bottom: 1px solid rgba(17, 17, 17, 0.35);
    display: block;
    padding-bottom: 0.4em;
  }

  > div {
    font-size: 0.95em;
  }
`;

const ClosedMessageDiv = styled.div`
  position: absolute;
  top: -3em;
  left: 0;
  display: flex;
  align-items: center;
  gap: 1em;
  border-bottom: none !important;
`;

export default function JobApplyPageClient({ job }) {
  const [modelOpen, setModelOpen] = useState(false);

  const {
    title,
    company,
    location,
    locationType,
    status,
    employmentType,
    salary,
    description,
    createdAt,
    updatedAt,
    coverLetterRequired,
    questions,
    _id,
  } = job;

  const created = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const updated = formatDistanceToNow(new Date(updatedAt), { addSuffix: true });

  const date = created === updated ? `Created: ${created}` : ` ${updated}`;

  return (
    <Main>
      <DetailsDiv>
        <div>
          <span>Role</span>
          <span>{title}</span>
        </div>
        <div>
          <span>Company</span>
          <span>{company}</span>
        </div>
        <TypesDiv>
          <span>Types</span>
          <div>
            <div>
              <span>{employmentType}</span>
            </div>
            <div>
              <span>{locationType}</span>{" "}
            </div>
          </div>
        </TypesDiv>
        <div>
          <span>Location</span>
          <span>{location ? `${location}` : "-"}</span>
        </div>
        <div>
          <span>Salary</span>
          <span>{salary ? `${salary} LKR` : "-"}</span>
        </div>
        <div>
          <span>Last update</span>
          <span>{date}</span>
        </div>

        <AppyBtn
          onClick={status !== "closed" ? () => setModelOpen(true) : null}
          style={{
            backgroundColor: status === "closed" ? "#cccccc" : "#111111",
            cursor: status === "closed" ? "not-allowed" : "pointer",
          }}
        >
          <p>Apply Now</p>
          <FaCircleArrowRight size={20} color="#ffffff" />
        </AppyBtn>

        {status === "closed" && (
          <ClosedMessageDiv>
            <IoMdCloseCircle size={22} color="#FF0505" />
            <span style={{ color: " #ff0505" }}>
              We are currently not accepting applications for this position
            </span>
          </ClosedMessageDiv>
        )}
      </DetailsDiv>
      <DescriptionDiv>
        <span>Job Description</span>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </DescriptionDiv>

      <PopupModel isOpen={modelOpen} onClose={() => setModelOpen(false)}>
        <ApplyForm
          jobId={_id}
          additionalFields={{ coverLetterRequired, questions }}
        />
      </PopupModel>
    </Main>
  );
}
