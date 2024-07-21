import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main className="flex items-center justify-center min-h-screen">
        {children}
      </main>
    </div>
  );
}