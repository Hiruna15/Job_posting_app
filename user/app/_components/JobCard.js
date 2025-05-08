"use client";

import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import styled from "styled-components";
import { BiSolidCity } from "react-icons/bi";
import { FaCircleArrowRight } from "react-icons/fa6";

const Card = styled.div`
  width: 26em;
  height: 12em;
  background-color: red;
  border-radius: 1.5em;
  background-color: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.14);
  padding: 0 2em;
  font-size: 0.9em;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  /* gap: 1em; */
  justify-content: center;
  position: relative;

  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-0.5em);
    box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
  }

  > span:nth-child(1) {
    font-size: 1em;
  }

  > span:nth-child(4) {
    position: absolute;
    right: 2em;
    top: 1em;
    color: #ff0000;
  }

  > div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
      gap: 0.5em;
      background-color: #d9d9d9;
      border-left: 2px solid #000000;
      font-size: 0.9em;
      padding: 0.5em 1em;
      border-top-right-radius: 0.5em;
      border-bottom-right-radius: 0.5em;
    }
  }

  > div:nth-child(3) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const TypesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  font-size: 0.85em;
  color: white;

  div {
    background-color: black;
    padding: 0.5em 1.5em;
    border-radius: 1.5em;
  }
`;

const DateDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8em;

  > span:nth-child(1) {
    color: rgba(17, 17, 17, 0.65);
  }
`;

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

  const router = useRouter();

  const created = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const updated = formatDistanceToNow(new Date(updatedAt), { addSuffix: true });

  const date = created === updated ? created : updated;

  return (
    <Card>
      <span>{title}</span>
      <div>
        <div>
          <BiSolidCity size={18} color="black" />
          <span>{company}</span>
        </div>
        <FaCircleArrowRight
          size={20}
          color="black"
          cursor="pointer"
          onClick={() => router.push(`/jobs/${jobId}`)}
        />
      </div>

      <div>
        <TypesContainer>
          <div>
            <span>{locationType}</span>
          </div>
          <div>
            <span>{employmentType}</span>
          </div>
        </TypesContainer>

        <DateDiv>
          <span>Last update</span>
          <span>{date}</span>
        </DateDiv>
      </div>

      {status === "closed" && <span>{status}</span>}

      {/* <h2>{title}</h2>
      <p>{company}</p>
      <p>{location}</p>
      <p>{locationType}</p>
      <p>{status}</p>
      <p>{employmentType}</p>
      <p>{salary}</p>
      <p>{date}</p>

      <button onClick={() => router.push(`/jobs/${jobId}`)}>View</button> */}
    </Card>
  );
}
