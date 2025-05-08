import UsersPageClient from "@/app/_components/UsersPageClient";
import { getAdminUsers } from "@/app/_lib/data-service";

export const metadata = {
  title: "Users",
};

export default async function Page() {
  const adminUsers = await getAdminUsers();

  return <UsersPageClient adminUsers={adminUsers} />;
}
