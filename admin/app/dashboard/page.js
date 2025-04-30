import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Dashboard",
};

export default async function DashBoard() {
  const session = await getServerSession(authOptions);
  console.log("session", session);

  if (!session) {
    return <div>Unauthorized</div>;
  }
  return <div>dashboard</div>;
}
