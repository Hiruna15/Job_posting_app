"use client";

import styled from "styled-components";
import { TbWorldSearch } from "react-icons/tb";
import { Lexend } from "next/font/google";
import { Kodchasan } from "next/font/google";
import { useRouter } from "next/navigation";

const lexend = Lexend({ subsets: ["latin"], weight: ["400", "700"] });
const kodchasan = Kodchasan({ subsets: ["latin"], weight: ["400", "700"] });

const HeroDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  gap: 1em;

  > span:nth-child(1) {
    font-size: 3.5em;
    /* font-weight: 700; */
  }

  > span:nth-child(2) {
    font-size: 1.2em;
    font-weight: 700;
    color: rgba(17, 17, 17, 0.7);
  }

  > div {
    display: flex;
    align-items: center;
    gap: 1.5em;
    padding: 0.8em 2em;
    background-color: #111111;
    color: white;
    border-radius: 1em;
    margin-top: 2em;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
      background-color: #333333;
      transform: scale(1.05);
    }
  }
`;

export default function HeroSection() {
  const router = useRouter();

  return (
    <HeroDiv className={lexend.className}>
      <span>Find Your Next Opportunity</span>
      <span className={kodchasan.className}>
        Discover thousands of job openings from top companies. Start your career
        journey today.
      </span>
      <div className={kodchasan.className} onClick={() => router.push("/jobs")}>
        <span>Explore Jobs</span>
        <TbWorldSearch size={25} />
      </div>
    </HeroDiv>
  );
}
