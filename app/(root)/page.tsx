// pages/index.tsx
"use client";

import Active from "@/components/views/Active";
import Ready from "@/components/views/Ready";
import { useState } from "react";


export default function Home() {
  const [isActive, setIsActive] = useState(false);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleEndCall = () => {
    setIsActive(false);
  };

  return (
    <div className="relative">
      {isActive ? (
        <Active onEndCall={handleEndCall} />
      ) : (
        <Ready onStart={handleStart} />
      )}
    </div>
  );
}