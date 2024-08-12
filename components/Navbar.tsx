import { useState } from "react";
import { Columns2, Settings2 } from "lucide-react";
import ProfileSettingsDialog from "./ProfileSettingsDialog";
import AvatarDropdown from "./AvatarDropdown";
import { SettingsDialog } from "./SettingsDialog";
import AIStateIndicator from "./AIStateIndicator";

interface NavbarProps {
  toggleFlyout: () => void;
  isFlyoutOpen: boolean;
}

export default function Navbar({ toggleFlyout, isFlyoutOpen }: NavbarProps) {
  const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setSettingsDialogOpen] = useState(false);

  const handleProfileDialogOpen = () => setProfileDialogOpen(true);
  const handleProfileDialogClose = () => setProfileDialogOpen(false);

  const handleSettingsDialogOpen = () => setSettingsDialogOpen(true);
  const handleSettingsDialogClose = () => setSettingsDialogOpen(false);

  return (
    <div className="relative flex justify-between mt-[112px] max-w-[1440px] ml-auto mr-auto pl-[5%] pr-[5%] min-h-[48px]">
      <div className="relative">
      </div>
      <div className="w-full flex justify-between items-center">
        {!isFlyoutOpen && (
          <div className="flex gap-[13px]">
            <button
              onClick={toggleFlyout}
              className="w-[48px] h-[48px] text-[#CDCDCD] bg-[#F4F4F5] rounded-full flex items-center justify-center cursor-pointer z-50 hover:bg-[#363636] hover:text-[#ECECF1] transition-colors"
            >
              <Columns2 className="h-[24px] w-[24px]" />
            </button>
            <button
              onClick={handleSettingsDialogOpen}
              className="w-[48px] h-[48px] text-[#CDCDCD] bg-[#F4F4F5] rounded-full flex items-center justify-center cursor-pointer z-50 hover:bg-[#363636] hover:text-[#ECECF1] transition-colors"
            >
              <Settings2 className="h-[24px] w-[24px]" />
            </button>
          </div>
        )}
        {!isFlyoutOpen && (
          <AvatarDropdown onSettingsClick={handleProfileDialogOpen} />
        )}
      </div>

      <ProfileSettingsDialog open={isProfileDialogOpen} onOpenChange={setProfileDialogOpen} />
      <SettingsDialog open={isSettingsDialogOpen} onOpenChange={setSettingsDialogOpen} />
    </div>
  );
}