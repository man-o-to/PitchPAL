import { ProfileDropdown } from "@/components/profile-dropdown";
import { SidebarDesktop } from "@/components/sidebar-dt";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarDesktop />
      <ProfileDropdown />
      <main>
          {children}
      </main>
    </div>
  );
}
