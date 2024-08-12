// components/Active.tsx
"use client";

import { useEffect } from "react";
import AIStateIndicator from "@/components/AIStateIndicator";
import HintCards from "@/components/HintCards";
import ObjectionText from "@/components/ObjectionText";
import ProgressBar from "@/components/ProgressBar";
import EndCallButton from "../EndCallButton";

export default function Active({ onEndCall }: { onEndCall: () => void }) {
  useEffect(() => {
    // This effect runs when the component mounts

    // Cleanup function to stop the microphone when the component unmounts or the call ends
    return () => {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        stream.getTracks().forEach((track) => track.stop());
      });
    };
  }, []);

  return (
    <div className="relative mt-[170px] flex flex-col items-center">
      <AIStateIndicator isLarge={false} />
      <ObjectionText />
      <HintCards />
      <ProgressBar />
      <EndCallButton onEndCall={onEndCall} />
    </div>
  );
}