"use client";
import { useState } from "react";
import { VoiceBot } from "@/components/voicebot";

export default function Home() {
  const [isCalling, setIsCalling] = useState(false);

  const handleConnect = () => {
    // Simulate connection logic
    console.log("Connecting to microphone...");
    // Assume connection is successful after the delay in the component
  };

  const handleCall = () => {
    setIsCalling(true);
    // Handle call logic here
  };

  const handlePause = () => {
    setIsCalling(false);
    // Handle pause logic here
  };

  return (
    <VoiceBot
      onConnect={handleConnect}
      onCall={handleCall}
      onPause={handlePause}
      isCalling={isCalling}
    />
  );
}