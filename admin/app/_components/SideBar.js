"use client";

import Link from "next/link";
import styled from "styled-components";
import { AiFillDashboard } from "react-icons/ai";
import { IoMdListBox } from "react-icons/io";
import { PiUsersThreeFill } from "react-icons/pi";
import { RiSettings5Fill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { usePathname } from "next/navigation";
import SideBarHead from "./SideBarHead";
import { signOut } from "next-auth/react";

const sideBarTabs = [
  {
    name: "DashBoard",
    href: "/dashboard",
    icon: <AiFillDashboard color="white" size={18} />,
  },
  {
    name: "Jobs",
    href: "/dashboard/jobs",
    icon: <IoMdListBox color="white" size={18} />,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: <PiUsersThreeFill color="white" size={18} />,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: <RiSettings5Fill color="white" size={18} />,
  },
];

const SideBarContainer = styled.div`
  width: 19rem;
  height: 100%;
  background-color: #e4eafe;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  padding: 0.5em;
  padding-top: 1.5em;
  position: relative;

  nav {
    width: 90%;
  }
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  a {
    text-decoration: none;
    color: white;
    width: 100%;
  }
`;

const StyledLink = styled.div`
  background-color: ${(props) => (props.$active ? "#000000" : "#DBE1F4")};
  display: flex;
  align-items: center;
  gap: 1.5em;
  padding: 0.8em 1em;
  border-radius: 0.7em;
  color: ${(props) => (props.$active ? "#ffffff" : "rgba(17, 17, 17, 0.43)")};
  font-size: 0.85em;

  &:hover {
    background-color: ${(props) => (props.$active ? "#333333" : "#BCC7E8")};
    transition: background-color 0.3s ease;
  }
`;

const LogOutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4.5em;
  color: rgba(17, 17, 17, 0.43);
  border: 1px solid #dbe1f4;
  background-color: #dbe1f4;
  position: absolute;
  bottom: 4em;
  width: 85%;
  border-radius: 1em;
  padding: 0.8em;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #bcc7e8;
    border-color: #bcc7e8;
    color: #000000;
  }

  transition: background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease;
`;

export default function SideBar() {
  const pathname = usePathname();
  return (
    <SideBarContainer>
      <SideBarHead />
      <nav>
        <Ul>
          {sideBarTabs.map((tab) => (
            <li key={tab.name}>
              <Link href={tab.href} passHref>
                <StyledLink $active={pathname === tab.href}>
                  {tab.icon}
                  <span>{tab.name}</span>
                </StyledLink>
              </Link>
            </li>
          ))}
        </Ul>
      </nav>

      <LogOutBtn onClick={() => signOut({ callbackUrl: "/" })}>
        <IoMdLogOut size={25} />
        <span>Log out</span>
      </LogOutBtn>
    </SideBarContainer>
  );
}
