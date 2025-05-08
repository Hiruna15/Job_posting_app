import { ToastContainer } from "react-toastify";
import StyledComponentsRegistry from "./_lib/styled-components-registry";
import { Roboto } from "next/font/google";

export const metadata = {
  title: "Create Next App",
  description: "Admin panel for a job posting application",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body
        style={{
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          background: "#FFFFFF",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <StyledComponentsRegistry>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />;
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
