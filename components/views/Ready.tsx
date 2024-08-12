// components/Ready.tsx
"use client";

import AIStateIndicator from "@/components/AIStateIndicator";
import { Button } from "../ui/button";

export default function Ready({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <AIStateIndicator isLarge={true} />
      <div className="mb-[42px] text-center text-[40px] font-light text-[rgba(0,0,0,0.8)]">
        <p>Ready to start dialing?</p>
      </div>
      <div>
        <Button
          onClick={onStart} // Trigger the start action
          className="bg-[#DD6031] rounded-full w-[145px] h-[50px] font-normal text-xl"
        >
          Start
        </Button>
      </div>
    </div>
  );
}