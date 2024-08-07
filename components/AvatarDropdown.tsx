import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Settings, LifeBuoy, LogOut } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

interface AvatarDropdownProps {
  onSettingsClick: () => void; // Prop for handling Settings button click
}

export default function AvatarDropdown({ onSettingsClick }: AvatarDropdownProps) {
  const { user, isLoaded, isSignedIn } = useUser(); // Fetch user data from Clerk

  // Check if user data is still loading
  if (!isLoaded || !isSignedIn) return null; // Optionally show a loading spinner or placeholder here

  // Fallback initials based on user's first and last name
  const getInitials = (firstName: string, lastName: string) => {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-[48px] h-[48px] bg-[#F4F4F5] rounded-full flex items-center justify-center cursor-pointer z-50">
          {user?.imageUrl ? (
            <AvatarImage src={user.imageUrl} alt="User Avatar" className="rounded-full"/>
          ) : (
            <AvatarFallback>{getInitials(user.firstName || '', user.lastName || '')}</AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onSettingsClick} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {/* Other menu items */}
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
  );
}