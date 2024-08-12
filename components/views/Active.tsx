// components/Active.tsx
"use client";

import AIStateIndicator from "@/components/AIStateIndicator";
import HintCards from "@/components/HintCards";
import ObjectionText from "@/components/ObjectionText";
import ProgressBar from "@/components/ProgressBar";
import EndCallButton from "../EndCallButton";


export default function Active({ onEndCall }: { onEndCall: () => void }) {
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