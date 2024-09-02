// components/Ready.tsx

"use client";

import { useState, useEffect } from "react";
import AIStateIndicator from "@/components/AIStateIndicator";
import { Button } from "../ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";

export default function Ready({ onStart }: { onStart: (conversationId: Id<'conversations'>, progressData: ProgressData) => void }) {
  const { user } = useUser();
  const [microphoneAccess, setMicrophoneAccess] = useState<boolean | null>(null);
  const createConversation = useMutation(api.conversations.createConversation);
  const progressData = useMutation(api.feedback.getProgressNumbers);

  const handleStart = async () => {
    if (!user) {
      console.error("User is not logged in.");
      return;
    }

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicrophoneAccess(true);

      // Create a new conversation
      const newConversationId = await createConversation({ clerkId: user.id });
      console.log("New Conversation ID:", newConversationId);

      // Create a new progressDate
      const newProgressData = await progressData({ clerkId: user.id });
      console.log("New Progress Data:", newProgressData);

      // Pass the conversationId and progressData to the parent component
      if (newProgressData && newConversationId) {
        onStart(newConversationId, newProgressData);
      }
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
          onClick={handleStart}
          className="bg-[#DD6031] rounded-full w-[145px] h-[50px] font-normal text-xl"
        >
          Start
        </Button>
      </div>
      {microphoneAccess === false && (
        <p className="mt-4 text-red-500">Unable to access the microphone. Please check if it is properly connected.</p>
      )}
    </div>
  );
}

interface ProgressData {
  numberOfObjections: number;
  maxScore: number;
  passingScore: number;
}