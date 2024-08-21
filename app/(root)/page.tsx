// pages/index.tsx
"use client";

import Active from "@/components/views/Active";
import Ready from "@/components/views/Ready";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [conversationId, setConversationId] = useState<Id<'conversations'> | null>(null);

  const handleStart = (id: Id<'conversations'>) => {
    setConversationId(id);
    setIsActive(true);
  };

  const handleEndCall = () => {
    setIsActive(false);
    setConversationId(null); // Optionally reset conversationId
  };

  return (
    <div className="relative">
      {conversationId && isActive ? (
        <Active conversationId={conversationId} onEndCall={handleEndCall} />
      ) : (
        <Ready onStart={handleStart} />
      )}
    </div>
  );
}