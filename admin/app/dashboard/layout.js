// import { ToastContainer, toast } from "react-toastify";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SideBar from "../_components/SideBar";

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <main
      style={{
        display: "flex",
        // gap: "1em",
        height: "100%",
      }}
    >
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <SideBar />
      {children}
    </main>
  );
}
