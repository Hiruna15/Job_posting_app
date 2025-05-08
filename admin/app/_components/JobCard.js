"use client";

import { format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { deleteJob } from "../_lib/actions";
import { toast } from "react-toastify";
import { useState, useTransition } from "react";
import styled from "styled-components";
import { FaEye } from "react-icons/fa6";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import PopupModel from "./PopupModel";
import CreateJobForm from "./CreateJobForm";
import { MdDeleteOutline } from "react-icons/md";

export default function JobCard({ job, setEditFormOpen, setEditFormJob }) {
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
    applications,
  } = job;

  const pathName = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleModalOpen() {
    setEditFormJob(job);
    setEditFormOpen(true);
  }

  const Tr = styled.tr`
    cursor: pointer;
    transition: background-color 0.3s ease;
    /* border: 1px solid rgba(0, 0, 0, 0.18); */
    /* border-bottom: 4em; */

    border-bottom: 0.8em solid #ffffff;
    border-left: 0.2em solid #004bff;

    td {
      padding: 1.5em;
      background-color: #ededed;
      transition: background-color 0.3s ease;
      position: relative;
      font-size: 0.9em;

      color: #000000;

      border-collapse: collapse;
      border: none;

      /* border: none; */
    }

    &:hover {
      background-color: #d3d3d3;
      transform: scale(1.02);
      transition: background-color 0.3s ease, transform 0.3s ease;
    }
  `;

  const ApplicationsDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    justify-content: left;
    background-color: red;
    width: fit-content;
    padding: 0.5em;
    border-radius: 0.7em;
    background-color: rgba(57, 108, 236, 0.09);
    position: absolute;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    span {
      font-size: 0.8em;
    }
  `;

  const LastTd = styled.td`
    > div:nth-child(1) {
      position: absolute;
      right: -0.2em;
      z-index: 2;
      &:hover {
        transform: scale(1.5);
        transition: transform 0.3s ease;
      }
    }

    > div:nth-child(2) {
      position: absolute;
      background-color: red;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.3em;
      border-radius: 50%;
      right: 0;
      top: 0;
    }
  `;

  function handleDelete() {
    if (confirm("Are you sure you want to delete this job?")) {
      startTransition(async () => {
        try {
          await deleteJob(jobId);
          toast.success("Job deleted successfully!", {
            position: "top-center",
          });
        } catch (err) {
          toast.error(err.message, { position: "top-center" });
        }
      });
    }
  }

  return (
    <Tr style={{ color: "white" }}>
      <td>{company}</td>
      <td>{locationType}</td>
      <td>{title}</td>
      <td>{employmentType}</td>
      <td>
        {applications ? (
          <ApplicationsDiv onClick={() => router.push(`${pathName}/${jobId}`)}>
            <span>{applications}</span>
            <FaEye color="#004BFF" size={18} cursor="pointer" />
          </ApplicationsDiv>
        ) : (
          "Not yet"
        )}
      </td>
      <LastTd>
        {status}
        <div onClick={handleModalOpen}>
          <BiSolidMessageSquareEdit size={24} color="#004BFF" />
        </div>

        <div
          onClick={!isPending ? handleDelete : null}
          style={{ backgroundColor: isPending ? "gray" : "red" }}
        >
          <MdDeleteOutline color="#ffffff" size={15} />
        </div>
      </LastTd>
    </Tr>
  );
}
