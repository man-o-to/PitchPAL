import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GeneralSettings from "@/app/settings/general/page";
import ProfileSettings from "@/app/settings/profile/page";
import BillingSettings from "@/app/settings/billing/page";
import { useState } from "react";
import { SidebarNav } from "@/app/settings/components/SidebarNav";
import { Separator } from "./ui/separator";

const sidebarNavItems = [
  { title: "General", href: "/settings/general" },
  { title: "Profile", href: "/settings/profile" },
  { title: "Billing", href: "/settings/billing" },
];

export default function ProfileSettingsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void; }) {
  const [activeTab, setActiveTab] = useState('general'); // Default tab

  const handleTabChange = (href: string) => {
    const tab = href.split('/').pop();
    if (tab) setActiveTab(tab);
  };

  const renderSettingsContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'profile':
        return <ProfileSettings />;
      case 'billing':
        return <BillingSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] flex flex-col bg-white">
        <DialogHeader>
          <DialogTitle>Account Settings</DialogTitle>
          <DialogDescription>
            Manage your settings here.
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <div className="flex flex-1">
          <div className="w-1/4 flex flex-col">
            <SidebarNav
              items={sidebarNavItems}
              onClick={(e) => {
                e.preventDefault();
                const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href")!;
                handleTabChange(href);
              }}
            />
          </div>
          <div className="w-3/4 p-4">
            {renderSettingsContent()}
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}