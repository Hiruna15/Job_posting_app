"use client";

import styled from "styled-components";
import LoginForm from "./LoginForm";

const Main = styled.main`
  width: 100%;
  height: 100vh;
  background-color: #0e1320;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  width: 29rem;
  border: 1px solid rgb(19, 49, 102);
  background-color: #111927;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4em;
  padding: 3em 0;

  h1 {
    color: white;
    margin: 0;
  }
`;

export default function LoginPage() {
  return (
    <Main>
      <LoginContainer>
        <h1>JOBIFY</h1>

        <LoginForm />
      </LoginContainer>
    </Main>
  );
}
