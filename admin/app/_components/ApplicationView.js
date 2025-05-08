"use client";

import { TiUser } from "react-icons/ti";
import { MdEmail } from "react-icons/md";
import { HiCalendarDateRange } from "react-icons/hi2";
import { formatDistanceToNow } from "date-fns";
import styled from "styled-components";
import { FaFileInvoice } from "react-icons/fa";
import { useState } from "react";
import { Poppins } from "next/font/google";
import { editApplicationStatus } from "../_lib/actions";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const statuses = ["not reviewed", "selected", "rejected", "shortlisted"];

const ViewContainer = styled.div`
  width: 30em;
  padding: 3.5em;
  padding-top: 5em;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1em;
  overflow-y: auto;
  height: 24.4em;
  &::-webkit-scrollbar {
    display: none;
  }

  > span {
    position: absolute;
    top: 1.9em;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.98em;
  }
`;

const DetailsDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9em;

  gap: 1.2em;
`;

const FileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;

  div {
    display: flex;
    align-items: center;
    gap: 1.4em;
    background-color: #000000;
    padding: 0.8em 1.2em;
    border-radius: 1em;
    color: #ffffff;
    cursor: pointer;
    margin-top: 1em;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
      background-color: #333333;
      transform: scale(1.05);
    }
  }
`;

const AnswerDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.06);
  border-radius: 1.5em;
  padding: 1.4em 2em;
  font-size: 0.8em;

  div {
    border-bottom: 1px solid rgba(0, 0, 0, 0.45);
  }
`;

export default function ApplicationView({ role, application }) {
  let {
    answers,
    name,
    email,
    resumeUrl,
    coverLetterUrl,
    status,
    createdAt,
    _id,
  } = application;

  const [selectedStatus, setSelectedStatus] = useState(status);

  const handleOpenFile = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  async function editStatus(e) {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);

    try {
      await editApplicationStatus(_id, newStatus);
    } catch (error) {
      console.error("Error updating status:", error);
      return false;
    }
  }

  return (
    <ViewContainer className={poppins.className}>
      <span>{role}</span>
      <DetailsDiv>
        <TiUser size={22} color="#000000" />
        <span>{name}</span>
      </DetailsDiv>
      <DetailsDiv>
        <MdEmail size={20} color="#000000" />
        <span>{email}</span>
      </DetailsDiv>
      <DetailsDiv>
        <HiCalendarDateRange size={20} color="#000000" />
        <span>
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
        </span>
      </DetailsDiv>

      {answers.length > 0 &&
        answers.map((answer, index) => (
          <AnswerDiv key={index}>
            <div>
              <span>{answer.question}</span>
            </div>
            <p>{answer.answer}</p>
          </AnswerDiv>
        ))}

      <FileContainer>
        <div onClick={() => handleOpenFile(resumeUrl)}>
          <FaFileInvoice color="#195AF7" size={19} />
          <span>Resume</span>
        </div>

        {coverLetterUrl && (
          <div onClick={() => handleOpenFile(coverLetterUrl)}>
            <FaFileInvoice color="#195AF7" size={19} />
            <span>Cover Letter</span>
          </div>
        )}
      </FileContainer>

      <select onChange={editStatus}>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </ViewContainer>
  );
}
