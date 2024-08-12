"use client";

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
    <div className="flex h-screen bg-[#DD6031]">
        <div className="p-4 mt-[160px] mr-auto ml-auto">{children}</div>
    </div>
    );
  }