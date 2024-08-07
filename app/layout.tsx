import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";

import ConvexClerkProvider from "./providers/ConvexClerkProvider";
import { Toaster } from "@/components/ui/toaster";

// Load Inter font
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Pitch-Pal",
  description: "AI-powered sales training assistant for mastering cold calls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClerkProvider>
          {children}
        </ConvexClerkProvider>
        <Toaster />
      </body>
    </html>
  );
}