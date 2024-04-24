"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useEffect, useState, createContext, useContext } from "react";
import Loader from "@/components/common/Loader";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import  AppProvider  from "./AppContext";


export default function RootDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // const [session, setSession] = useState();
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    setTimeout(() => setLoading(false), 10000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <div className="flex h-screen overflow-hidden">
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <AppProvider>
                  <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                  <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                      {children}
                    </div>
                  </main>
                </AppProvider>
              </div>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
