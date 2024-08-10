import React from "react";
import { Columns2, Settings2, ExternalLink, MessageSquare, Trash2, Sun, LogOut, SquarePlus, UserCog, LayoutGrid } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

// Sample data for conversations
const conversations = [
  { date: '2023-07-15', name: 'Conversation 1' },
  { date: '2023-08-01', name: 'Conversation 2' },
  { date: '2023-08-15', name: 'Conversation 3' },
];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

interface FlyoutProps {
  isOpen: boolean;
  onClose: () => void;
  toggleFlyout: () => void;
}

const buttonClasses = "flex items-center gap-3 text-[#ECECF1] hover:bg-[#242F40] transition-colors px-4 py-2 rounded text-medium text-[14px]/[16px] w-full h-[42px] text-left";

export default function Flyout({ isOpen, onClose, toggleFlyout }: FlyoutProps) {
  const groupedConversations = conversations.reduce((acc, conv) => {
    const date = formatDate(conv.date);
    if (!acc[date]) acc[date] = [];
    acc[date].push(conv);
    return acc;
  }, {} as Record<string, { date: string, name: string }[]>);

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-[#363636] text-[#ECECF1] shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-50`}
      style={{ width: "300px" }}
    >
      <div className="flex flex-col h-full p-3">
        {/* Top Section */}
        <div className="flex flex-col gap-3 mb-3">
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={onClose}
              className="flex items-center gap-3 text-[#ECECF1] hover:bg-[#242F40] transition-colors px-4 py-2 rounded h-[42px]"
            >
              <Columns2 className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
            <button
              onClick={() => console.log('New Chat')}
              className="flex items-center gap-3 text-[#ECECF1] hover:bg-[#242F40] transition-colors px-4 py-2 rounded h-[42px]"
            >
              <SquarePlus className="h-6 w-6" />
              <span className="sr-only">New Chat</span>
            </button>
          </div>
          <a
            href="#"
            className={buttonClasses}
          >
            <LayoutGrid className="h-4 w-4" />
            <span>PitchPAL</span>
          </a>
        </div>

        {/* Middle Section */}
        <div className="flex-1 p-0 overflow-y-auto">
          <div className="space-y-3 mb-3">
            {Object.entries(groupedConversations).map(([date, conversations]) => (
              <div key={date}>
                <h3 className="font-semibold text-xs text-muted-foreground px-4 py-2">{date}</h3>
                {conversations.map((conv) => (
                  <a
                    key={conv.name}
                    href="#"
                    className={buttonClasses}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>{conv.name}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-3">
          <button
            className={buttonClasses}
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear Conversations</span>
          </button>
          <button
            className={buttonClasses}
          >
            <Sun className="h-4 w-4" />
            <span>Change Theme</span>
          </button>
          <button
            className={buttonClasses}
          >
            <UserCog className="h-4 w-4" />
            <span>Account Settings</span>
          </button>
          <button
            className={buttonClasses}
          >
            <ExternalLink className="h-4 w-4" />
            <span>Updates & FAQ</span>
          </button>
          <button className={buttonClasses}>
            <LogOut className="h-4 w-4" />
            <SignOutButton>Log Out</SignOutButton>
          </button>
        </div>
      </div>
    </div>
  );
}