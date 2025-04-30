import LoginForm from "./_components/LoginForm";

export const metadata = {
  title: "Admin login",
};

export default function Page() {
  return (
    <div>
      <h1>Admin login</h1>

      <LoginForm />
    </div>
  );
}
