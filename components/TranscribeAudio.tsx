// components/TranscribeAudio.tsx

import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import React, { useState, useRef } from "react";
import { toast } from "./ui/use-toast";

interface TranscribeAudioProps {
  onTranscription: (text: string | null) => void;
}

export default function TranscribeAudio({ onTranscription }: TranscribeAudioProps) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const transcribeAudio = useAction(api.openai.transcribeAudioAction);

  const startRecording = async () => {
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        const base64String = reader.result?.toString().split(",")[1];
        if (base64String) {
          try {
            const response = await transcribeAudio({ audioData: base64String });
            console.log("Transcription:", response);
            onTranscription(response); // Pass the transcription text to parent component
            toast({
              title: "Transcription Success",
              description: "Audio transcription completed successfully.",
            });
          } catch (error) {
            console.error("Error sending audio:", error);
            toast({
              title: "Error sending audio",
              description: "There was an issue with the audio transcription.",
              variant: 'destructive',
            });
          }
        }
      };

      reader.readAsDataURL(audioBlob);
      audioChunksRef.current = [];
      setIsRecording(false);
    };

    mediaRecorder.start();
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
      <button onClick={stopRecording} disabled={!isRecording} className="ml-2">Stop Recording</button>
    </div>
  );
}