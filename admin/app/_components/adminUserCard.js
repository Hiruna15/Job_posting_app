"use client";

import styled from "styled-components";
import { CiUser } from "react-icons/ci";

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
  font-size: 0.9em;
  background-color: rgba(0, 0, 0, 0.08);
  padding: 0.8em;
  border-radius: 1em;
  border: 1px solid rgba(17, 17, 17, 0.15);
  padding: 2em;
  cursor: pointer;

  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
    transform: scale(1.02);
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.2em;

    > span:nth-child(1) {
      font-size: 0.8em;
      color: rgba(17, 17, 17, 0.5);
    }

    > span:nth-child(2) {
      font-size: 0.9em;
    }
  }

  > div:nth-child(1) {
  }
`;

export default function AdminUserCard({ admin }) {
  return (
    <Card>
      <div>
        <CiUser size={24} />
      </div>
      <div>
        <span>Email</span>
        <span>{admin.email}</span>
      </div>
      <div>
        <span>Admine Type</span>
        <span>{admin.role}</span>
      </div>
    </Card>
  );
}
