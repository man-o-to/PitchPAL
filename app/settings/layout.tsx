import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";
import { SidebarNav } from "./components/SidebarNav";

const sidebarNavItems = [
  { title: "General", href: "/settings/general" },
  { title: "Profile", href: "/settings/profile" },
  { title: "Billing", href: "/settings/billing" },
];

interface SettingsLayoutProps {
  children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside className="-mx-4 lg:w-1/5">
        <SidebarNav items={sidebarNavItems} onClick={function (e: any): void {
          throw new Error("Function not implemented.");
        } } activeTab={""} />
      </aside>
      <div className="flex-1 lg:max-w-2xl p-4">
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
        <Separator className="my-6" />
        {children}
      </div>
    </div>
  );
}