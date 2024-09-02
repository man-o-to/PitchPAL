// pages/index.tsx

"use client";

import Active from "@/components/views/Active";
import Ready from "@/components/views/Ready";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

interface ProgressData {
  numberOfObjections: number;
  maxScore: number;
  passingScore: number;
}

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [conversationId, setConversationId] = useState<Id<'conversations'> | null>(null);
  const [progressData, setProgressData] = useState<ProgressData | null>(null);

  const handleStart = (id: Id<'conversations'>, progress: ProgressData) => {
    setConversationId(id);
    setProgressData(progress);
    setIsActive(true);
  };

  const handleEndCall = () => {
    setIsActive(false);
    setConversationId(null); // Optionally reset conversationId
    setProgressData(null); // Optionally reset progressData
  };

  return (
    <div className="relative">
      {conversationId && isActive && progressData ? (
        <Active 
          conversationId={conversationId} 
          progressData={progressData} // Pass progressData to Active component
          onEndCall={handleEndCall} 
        />
      ) : (
        <Ready onStart={handleStart} />
      )}
    </div>
  );
}