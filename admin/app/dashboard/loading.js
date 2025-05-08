import { PuffLoader } from "react-spinners";

export default function Loading() {
  return (
    <div
      style={{
        flex: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <PuffLoader />
    </div>
  );
}
