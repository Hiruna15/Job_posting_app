"use client";

import styled from "styled-components";
import NavBar from "./NavBar";
import { Kanit } from "next/font/google";

const kanit = Kanit({ subsets: ["latin"], weight: "400" });

const Header = styled.header`
  background-color: #111111;
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 35em;
  color: white;
  padding: 1em 2em;
  z-index: 10;

  > h2 {
    margin: 0;
    font-size: 2em;
  }
`;

function Head() {
  return (
    <Header>
      <h2 className={kanit.className}>Jobify</h2>
      <NavBar />
    </Header>
  );
}

export default Head;
