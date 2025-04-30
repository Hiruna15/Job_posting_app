export const metadata = {
  title: "Create Next App",
  description: "Admin panel for a job posting application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
