"use client";

import Link from "next/link";

import styled from "styled-components";
import { Kodchasan } from "next/font/google";
import { usePathname } from "next/navigation";

const kodchasan = Kodchasan({ subsets: ["latin"], weight: ["400", "700"] });

const Nav = styled.nav`
  a {
    text-decoration: none;
    color: #fff;
    font-size: 1.2em;
    /* font-weight: 700; */
    transition: all 0.3s ease-in-out;
  }

  a:hover {
    color: #0022ff;
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    padding: 0;
    margin: 0;
    gap: 3em;
    font-size: 0.9em;
  }
`;

const StyledLink = styled.div`
  /* background-color: ${(props) =>
    props.$active ? "2px solid #0022ff" : "none"}; */
  border-bottom: ${(props) => (props.$active ? "3px solid #0022ff" : "none")};
  padding-bottom: 0.1em;
`;

export default function NavBar() {
  const pathName = usePathname();

  return (
    <Nav className={kodchasan.className}>
      <ul>
        <li>
          <Link href="/" passHref>
            <StyledLink $active={pathName === "/"}>
              <span>Home</span>
            </StyledLink>
          </Link>
        </li>
        <li>
          <Link href="/jobs" passHref>
            <StyledLink $active={pathName === "/jobs"}>
              <span>Jobs Feed</span>
            </StyledLink>
          </Link>
        </li>
      </ul>
    </Nav>
  );
}
