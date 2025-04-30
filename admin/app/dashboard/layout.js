import Link from "next/link";

export default function Layout({ children }) {
  const sideBarTabs = [
    { name: "DashBoard", href: "/dashboard" },
    { name: "Jobs", href: "/dashboard/jobs" },
    { name: "applications", href: "/dashboard/applications" },
    { name: "Users", href: "/dashboard/users" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div style={{ display: "flex", gap: "100px" }}>
      <nav>
        <ul>
          {sideBarTabs.map((tab) => (
            <li key={tab.name}>
              <Link href={tab.href}>{tab.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>{children}</div>
    </div>
  );
}
