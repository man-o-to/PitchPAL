// Active.tsx
"use client";

import { useState } from "react";
import AIStateIndicator from "@/components/AIStateIndicator";
import HintCards from "@/components/HintCards";
import ObjectionText from "@/components/ObjectionText";
import ProgressBar from "@/components/ProgressBar";
import EndCallButton from "../EndCallButton";
import GenerateAudio from "@/components/GenerateAudio";
import TranscribeAudio from "../TranscribeAudio";
import { Id } from "@/convex/_generated/dataModel";

export default function Active({ onEndCall }: { onEndCall: () => void }) {
  const [audioUrl, setAudioUrl] = useState('');
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null);
  const [transcribedText, setTranscribedText] = useState<string | null>(null);

  return (
    <div className="relative mt-[170px] flex flex-col items-center">
      <AIStateIndicator isLarge={false} />
      
      <TranscribeAudio onTranscription={setTranscribedText} />
      
      <GenerateAudio
        setAudio={setAudioUrl}
        setAudioStorageId={setAudioStorageId}
        audio={audioUrl}
        transcription={transcribedText}
      />

      <ObjectionText />
      <HintCards />
      <ProgressBar />
      <EndCallButton onEndCall={onEndCall} />
    </div>
  );
}