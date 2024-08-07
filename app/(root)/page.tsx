"use client";

import AIStateIndicator from "@/components/AIStateIndicator";
import EndCallButton from "@/components/EndCall";
import HintCards from "@/components/HintCards";
import Navbar from "@/components/Navbar";
import ObjectionText from "@/components/ObjectionText";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
  return (
    <div className="relative">
      <AIStateIndicator />
      <ObjectionText />
      <HintCards />
      <ProgressBar />
      <EndCallButton />
    </div>
  );
}