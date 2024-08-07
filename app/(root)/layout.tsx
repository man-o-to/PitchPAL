"use client";

import Flyout from "@/components/Flyout";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isFlyoutOpen, setFlyoutOpen] = useState(false);

  const toggleFlyout = () => {
    setFlyoutOpen(!isFlyoutOpen);
  };

  return (
    <div className="flex h-screen">
      <Flyout isOpen={isFlyoutOpen} onClose={toggleFlyout} toggleFlyout={toggleFlyout} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isFlyoutOpen ? "ml-[300px]" : "ml-0"
        }`}
      >
        <Navbar toggleFlyout={toggleFlyout} isFlyoutOpen={isFlyoutOpen} />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}