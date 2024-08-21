// components/GenerateAudio.tsx

import React, { useState, useEffect } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import { useUploadFiles } from '@xixixao/uploadstuff/react';
import { GenerateAudioProps } from "@/types";

const useGenerateAudio = ({
  setAudio, 
  setAudioStorageId,
  transcription
}: GenerateAudioProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Generate uploadUrl and upload audio file to database
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);

  // Returns TTS audio file  
  const getAiAudio = useAction(api.openai.generateSpeechAction);
  const getAudioUrl = useMutation(api.storage.getUrl);

  const generateAiAudio = async () => {
    if (!transcription) {
      console.error('No transcription available for generating audio.');
      toast({
        title: "Error",
        description: "No transcription available.",
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setAudio('');

    try {
      const response = await getAiAudio({
        voice: 'alloy',
        input: transcription
      });

      const blob = new Blob([response], { type: 'audio/mpeg' });
      const fileName = `ai-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: 'audio/mpeg' });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);

      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      setIsGenerating(false);
      toast({
        title: "AI Audio generated successfully",
      });
    } catch (error) {
      console.log('Error generating audio', error);
      toast({
        title: "Error creating audio",
        variant: 'destructive',
      });
      setIsGenerating(false);
    }
  };

  // Automatically trigger audio generation when transcription changes
  useEffect(() => {
    if (transcription) {
      generateAiAudio();
    }
  }, [transcription]);

  return { isGenerating, generateAiAudio };
};

const GenerateAudio = (props: GenerateAudioProps) => {
  const { isGenerating } = useGenerateAudio(props);

  return (
    <div>
      {props.audio && (
        <audio 
          controls
          src={props.audio}
          autoPlay
          className="mt-5"
        />
      )}
    </div>
  );
};

export default GenerateAudio;