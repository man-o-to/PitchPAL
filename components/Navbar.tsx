import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Columns2, LifeBuoy, LogOut, Mail, MessageSquare, Plus, PlusCircle, Settings, Settings2, User, UserPlus, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { SignOutButton } from "@clerk/nextjs";
import ProfileSettingsDialog from "./ProfileSettingsDialog"; // Import the dialog component

interface NavbarProps {
  toggleFlyout: () => void;
  isFlyoutOpen: boolean;
}

export default function Navbar({ toggleFlyout, isFlyoutOpen }: NavbarProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
    <div className="relative flex justify-between mt-[112px] mb-[200px] max-w-[1440px] ml-auto mr-auto pl-[5%] pr-[5%] min-h-[48px]">
      <div className="w-full flex justify-between items-center">
        {!isFlyoutOpen && (
          <div className="flex gap-[13px]">
            <button
              onClick={toggleFlyout}
              className="w-[48px] h-[48px] bg-[#F4F4F5] rounded-full flex items-center justify-center cursor-pointer z-50"
            >
              <Columns2 className="text-[#CDCDCD] h-[24px] w-[24px]" />
            </button>
            <button
              onClick={handleDialogOpen}
              className="w-[48px] h-[48px] bg-[#F4F4F5] rounded-full flex items-center justify-center cursor-pointer z-50"
            >
              <Settings2 className="text-[#CDCDCD] h-[24px] w-[24px]" />
            </button>
          </div>
        )}
        {!isFlyoutOpen && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-[48px] h-[48px] bg-[#F4F4F5] rounded-full flex items-center justify-center cursor-pointer z-50">
                <AvatarImage src="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Team</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Invite users</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Message</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>More...</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>New Team</span>
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <SignOutButton />
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Render the dialog */}
      <ProfileSettingsDialog open={isDialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}