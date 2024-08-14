// components/Active.tsx
"use client";

import { useEffect, useRef, useState } from "react";

import AIStateIndicator from "@/components/AIStateIndicator";
import HintCards from "@/components/HintCards";
import ObjectionText from "@/components/ObjectionText";
import ProgressBar from "@/components/ProgressBar";
import EndCallButton from "../EndCallButton";

import { AudioRecorder } from "@/lib/audioRecorder";
import { transcribeAudio } from "@/lib/whisperService";

export default function Active({ onEndCall }: { onEndCall: () => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);

  useEffect(() => {
    recorderRef.current = new AudioRecorder();

    // Cleanup function to stop the microphone when the component unmounts or the call ends
    return () => {
      recorderRef.current?.clearAudio();
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        stream.getTracks().forEach((track) => track.stop());
      });
    };
  }, []);

  const handleStartRecording = async () => {
    try {
      console.log("Starting recording...");
      await recorderRef.current?.startRecording();
      setIsRecording(true);
      setAudioURL(null); // Clear previous audio
      setTranscription(null); // Clear previous transcription
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const handleStopRecording = async () => {
    try {
      if (isRecording) {
        console.log("Stopping recording...");
        const audioBlob = await recorderRef.current?.stopRecording();
        setIsRecording(false);

        if (audioBlob) {
          console.log("Recording complete, creating audio URL...");
          const url = URL.createObjectURL(audioBlob);
          setAudioURL(url);
          console.log("Audio URL:", url);

          // Send the audioBlob to Whisper API for transcription
          console.log("Sending audio for transcription...");
          const transcribedText = await transcribeAudio(audioBlob);
          console.log("Transcription complete:", transcribedText);
          setTranscription(transcribedText);
        } else {
          console.error("No audioBlob was created.");
        }
      }
    } catch (error) {
      console.error("Error stopping recording or transcribing:", error);
    }
  };

  return (
    <div className="relative mt-[170px] flex flex-col items-center">
      <AIStateIndicator isLarge={false} />
      
      <button onClick={handleStartRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={handleStopRecording} disabled={!isRecording}>
        Stop Recording
      </button>

      {audioURL ? (
        <div className="mt-4">
          <p>Playback your recording:</p>
          <audio controls src={audioURL} />
        </div>
      ) : (
        <p>No recording available</p>
      )}

      {transcription ? (
        <div className="mt-4">
          <p>Transcription:</p>
          <p className="bg-gray-100 p-4 rounded-lg">{transcription}</p>
        </div>
      ) : (
        <p>No transcription available</p>
      )}
      
      <ObjectionText />
      <HintCards />
      <ProgressBar />
      <EndCallButton onEndCall={onEndCall} />
    </div>
  );
}