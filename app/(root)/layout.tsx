"use client";

import { ProfileDropdown } from "@/components/profile-dropdown";
import { Sidebar, SidebarToggle } from "@/components/sidebar";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative z-0 flex h-screen w-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 relative ${isSidebarOpen ? "ml-96" : "ml-0"}`}>
        <div className="sticky top-0 p-3 mb-1.5 flex items-center justify-between z-10 h-14 font-semibold">
          <div className="flex items-center gap-0 overflow-hidden">
            <div className="flex items-center">
              <SidebarToggle toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
              <h3 className=""> pitch-pal </h3>
            </div>
          </div>
          <ProfileDropdown />
        </div>
        <main className="relative h-full w-full flex-1 overflow-auto transition-width">
          {children}
        </main>
      </div>
    </div>
  );
}