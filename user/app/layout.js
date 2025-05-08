import Head from "./_components/Head";
import { Poppins } from "next/font/google";

export const metadata = {
  title: "Jobify",
  description: "Jobify - Your Job Search Companion",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body
        style={{
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          paddingTop: "3.5em",
          height: "100vh",
        }}
      >
        <Head />
        {children}
      </body>
    </html>
  );
}
