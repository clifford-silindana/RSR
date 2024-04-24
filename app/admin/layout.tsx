"use client";
// import "./globals.css";
// import "./data-tables-css.css";
// import "./satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";

import Sidebar from "@/components/Menu/AdminSidebar";
import Header from "@/components/Header";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const menuOptions = [{ name: "Permits", url: "/admin/safetyPermit/permits" },{ name: "Permit Applications", url: "/admin/safetyPermit" }, { name: "Operators", url: "/admin/operators" }, { name: "Registrations", url: "/admin/registration" }, { name: "Notifications", url: "/admin/notifications" }, { name: "Tasks", url: "/admin/approvals" }, { name: "Users", url: "/admin/users" }, { name: "User Roles", url: "/admin/roles" }];
  return (
    <html lang="en" >
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <div className="flex h-screen overflow-hidden">
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                options={menuOptions}
              />
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                <main>
                  <div className="">{children}</div>
                </main>
              </div>
            </div>
          )}
        </div>
      </body>
    </html >
  );
}