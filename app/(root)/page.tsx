"use client";

import AIStateIndicator from "@/components/AIStateIndicator";
import EndCallButton from "@/components/EndCall";
import HintCards from "@/components/HintCards";
import ObjectionText from "@/components/ObjectionText";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
  return (
    <div className="relative">
      <ObjectionText />
      <HintCards />
      <ProgressBar />
      <EndCallButton />
    </div>
  );
}