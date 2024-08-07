import React from "react";
import { Columns2, Settings2 } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

interface FlyoutProps {
  isOpen: boolean;
  onClose: () => void;
  toggleFlyout: () => void;
}

export default function Flyout({ isOpen, onClose, toggleFlyout }: FlyoutProps) {
  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-50`}
      style={{ width: "300px" }}
    >
      <div className="p-4">
        <button onClick={onClose} className="mb-4">
          Close
        </button>
        <h2>Conversations</h2>
        <SignOutButton />
        <div className="flex gap-[13px] mt-4">
          <button
            onClick={toggleFlyout}
            className="w-[48px] h-[48px] bg-[#F4F4F5] rounded-full flex items-center justify-center cursor-pointer z-50"
          >
            <Columns2 className="text-[#CDCDCD] h-[24px] w-[24px]" />
          </button>
          <button className="w-[48px] h-[48px] bg-[#F4F4F5] rounded-full flex items-center justify-center cursor-pointer z-50">
            <Settings2 className="text-[#CDCDCD] h-[24px] w-[24px]" />
          </button>
        </div>
      </div>
    </div>
  );
}