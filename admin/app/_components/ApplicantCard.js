"use client";

import { FaRegEye, FaRegFileLines } from "react-icons/fa6";
import { formatDistanceToNow, format } from "date-fns";
import { MdOutlineDelete } from "react-icons/md";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { triggerRevalidate } from "../_lib/actions";

const FileDiv = styled.div`
  padding: 0.5;

  &:hover {
    background-color: rgb(7, 0, 70);
  }

  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

async function handleDelete(applicationId, jobId) {
  try {
    const response = await axios.delete("/api/delete-application", {
      data: { id: applicationId, jobId },
    });

    if (response.data.success) {
      toast.success("Application deleted successfully", {
        position: "top-center",
      });
    }

    triggerRevalidate(`/dashboard/jobs/${jobId}`);
  } catch (err) {
    toast.error("Failed to delete the application", {
      position: "top-center",
    });
  }
}

const LastTd = styled.td`
  position: relative;

  div {
    position: absolute;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.3em;
    border-radius: 50%;
    background-color: #004bff;
    cursor: pointer;
    transition: transform 0.3s ease;
    right: -0.7em;
    top: 1em;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export default function ApplicantCard({
  application,
  setModelOpen,
  setSelectedApplication,
}) {
  const {
    name,
    email,
    resumeUrl,
    coverLetterUrl,
    status,
    createdAt,
    _id,
    jobId,
  } = application;

  function openModel() {
    setModelOpen(true);
    setSelectedApplication(application);
  }

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>
        <FileDiv>
          <FaRegFileLines size={15} color="#004BFF" />
        </FileDiv>
      </td>
      <td>
        {coverLetterUrl ? (
          <div>
            <FaRegFileLines size={15} color="#004BFF" />
          </div>
        ) : (
          "-"
        )}
      </td>
      <td>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</td>
      <td>{status ? status : "not reviewed"}</td>
      <LastTd>
        <MdOutlineDelete
          size={17}
          color="#EB3223"
          cursor="pointer"
          onClick={() => handleDelete(_id, jobId)}
        />

        <div onClick={openModel}>
          <FaRegEye size={12} color="white" />
        </div>
      </LastTd>
    </tr>
  );
}
