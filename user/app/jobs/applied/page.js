import Link from "next/link";

export default function Page() {
  return (
    <main
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2em",
          background: "#111111",
          color: "#ffffff",
          padding: "2em",
          borderRadius: "1em",
        }}
      >
        <span>Your application was successfully submitted</span>
        <Link href="/jobs">Search more jobs</Link>
      </div>
    </main>
  );
}
