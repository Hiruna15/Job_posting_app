import CreateUserForm from "@/app/_components/CreateUserForm";
import { getAdminUserEmails } from "@/app/_lib/data-service";

export const metadata = {
  title: "Create User",
};

export default async function Page() {
  const emails = await getAdminUserEmails();

  return <CreateUserForm emails={emails} />;
}
