import { SidebarDesktop } from "@/components/sidebar-dt";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarDesktop />
      <main>
          {children}
      </main>
    </div>
  );
}
