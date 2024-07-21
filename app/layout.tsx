import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import ConvexClerkProvider from "./providers/ConvexClerkProvider";

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
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClerkProvider>
            {children}
          </ConvexClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
