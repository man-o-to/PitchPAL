// components/Ready.tsx
"use client";

import { useState } from "react";
import AIStateIndicator from "@/components/AIStateIndicator";
import { Button } from "../ui/button";

export default function Ready({ onStart }: { onStart: () => void }) {
  const [microphoneAccess, setMicrophoneAccess] = useState<boolean | null>(null);

  const handleStart = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicrophoneAccess(true);

      // Pass the stream or set it to state if needed
      onStart(); // Transition to the Active component
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setMicrophoneAccess(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <AIStateIndicator isLarge={true} />
      <div className="mb-[42px] text-center text-[40px] font-light text-[rgba(0,0,0,0.8)]">
        <p>Ready to start dialing?</p>
      </div>
      <div>
        <Button
          onClick={handleStart} // Trigger the start action with microphone access check
          className="bg-[#DD6031] rounded-full w-[145px] h-[50px] font-normal text-xl"
        >
          Start
        </Button>
      </div>
      {microphoneAccess === false && (
        <p className="mt-4 text-red-500">Unable to access the microphone. Please check your permissions.</p>
      )}
    </div>
  );
}