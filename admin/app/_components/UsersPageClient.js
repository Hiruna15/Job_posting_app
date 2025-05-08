"use client";

import { useRouter } from "next/navigation";
import AdminUserCard from "./adminUserCard";
import styled from "styled-components";
import PopupModel from "./PopupModel";
import CreateUserForm from "./CreateUserForm";
import { useState } from "react";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  flex: 1;

  padding: 2em 4em;

  > div:nth-child(2) {
    display: flex;
    align-items: center;
    gap: 3em;
  }
`;

const CreateButton = styled.div`
  padding: 1.2em 2em;
  border-radius: 1em;
  color: #ffffff;
  background-color: #111111;
  width: fit-content;
  cursor: pointer;
  font-size: 0.8em;
`;

export default function UsersPageClient({ adminUsers }) {
  const router = useRouter();
  const [modelOpen, setModelOpen] = useState(false);

  return (
    <Main>
      <CreateButton onClick={() => setModelOpen(true)}>
        <span>Create a new Admin</span>
      </CreateButton>

      <div>
        {adminUsers.length ? (
          adminUsers.map((admin) => (
            <AdminUserCard admin={admin} key={admin._id} />
          ))
        ) : (
          <span>No other admin users</span>
        )}
      </div>

      <PopupModel isOpen={modelOpen} onClose={() => setModelOpen(false)}>
        <CreateUserForm emails={[""]} />
      </PopupModel>
    </Main>
  );
}
