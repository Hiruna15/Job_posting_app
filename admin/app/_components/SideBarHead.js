import styled from "styled-components";
import { Jura } from "next/font/google";

export const jura = Jura({ subsets: ["latin"] });

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5em;
  width: 80%;
`;

const ImageDiv = styled.div`
  width: 3em;
  height: 3em;
  background-color: gray;
  border-radius: 0.5em;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  gap: 0.2em;
  font-family: ${jura.style.fontFamily};
  color: #111111;
  h1 {
    margin: 0;
  }
`;

export default function SideBarHead() {
  return (
    <HeadContainer>
      {/* <ImageDiv></ImageDiv> */}
      <Div>
        <h1>JOBIFY</h1>
        <span>Admin</span>
      </Div>
    </HeadContainer>
  );
}
