// components/Active.tsx

"use client";

import React, { useState, useCallback } from "react";
import AIStateIndicator from "@/components/AIStateIndicator";
import HintCards from "@/components/HintCards";
import ObjectionText from "@/components/ObjectionText";
import ProgressBar from "@/components/ProgressBar";
import EndCallButton from "../EndCallButton";
import GenerateAudio from "@/components/GenerateAudio";
import TranscribeAudio from "../TranscribeAudio";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useAction, useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";

interface ActiveProps {
  conversationId: Id<'conversations'>;
  onEndCall: () => void;
  progressData: ProgressData;
}

const Active = ({ conversationId, onEndCall, progressData }: ActiveProps) => {
  const { user } = useUser();
  const [audioUrl, setAudioUrl] = useState('');
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null);
  const [transcribedText, setTranscribedText] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [hints, setHints] = useState<string[]>([]);
  const [objectionText, setObjectionText] = useState<string | null>(null);
  const [similarityScore, setSimilarityScore] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [usedObjectionsCount, setUsedObjectionsCount] = useState<number>(0);
  const [lastObjectionId, setLastObjectionId] = useState<Id<"objections"> | null>(null);

  const sendMessage = useMutation(api.messages.sendMessage);
  const getAiResponse = useAction(api.openai.getConversationResponse);
  const getHintsByObjectionId = useMutation(api.objections.getHintsByObjectionId);
  const getObjectionText = useMutation(api.objections.getObjectionText);
  const compareResponses = useAction(api.openai.compareResponses);

  // Fetch messages only if conversationId is available
  const listMessagesQuery = useQuery(api.messages.listMessages, { conversationId });

  const handleSendMessage = useCallback(async (text: string, sender: 'user' | 'assistant') => {
    try {
      await sendMessage({
        conversationId,
        sender,
        text,
        correct: false,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [conversationId, sendMessage]);

  const handleConversation = useCallback(async (transcription: string | null) => {
    if (transcription && listMessagesQuery) {
      try {
        const messagesForOpenAI: { role: "user" | "assistant"; content: string }[] = listMessagesQuery.map(message => ({
          role: message.sender === 'user' ? 'user' : 'assistant',
          content: message.text,
        }));

        messagesForOpenAI.push({ role: 'user', content: transcription });

        const { parsedResponse, objectionId } = await getAiResponse({ input: transcription, messages: messagesForOpenAI });
        setAiResponse(parsedResponse);

        if (objectionId) {
          // Store the last objection ID when it's presented
          setLastObjectionId(objectionId as Id<"objections">);

          // Increment used objections count
          setUsedObjectionsCount(prevCount => prevCount + 1);

          const hintsForObjection = await getHintsByObjectionId({ objectionId: objectionId as Id<"objections"> });
          setHints(hintsForObjection);

          const objection = await getObjectionText({ objectionId: objectionId as Id<"objections"> });
          setObjectionText(objection);

          // AI moves on to the next response or objection here
        }

        await handleSendMessage(transcription, 'user');
        await handleSendMessage(parsedResponse, 'assistant');
      } catch (error) {
        console.error("Error handling conversation:", error);
      }
    }
  }, [conversationId, getAiResponse, handleSendMessage, listMessagesQuery, getHintsByObjectionId, compareResponses]);

  // Compare the user's response to the last objection after they've responded
const handleUserResponse = useCallback(async (userResponse: string | null) => {
  if (userResponse && lastObjectionId) { // Ensure userResponse is not null
    try {
      const { score } = await compareResponses({ userResponse, objectionId: lastObjectionId });
      setSimilarityScore(score);
      setTotalScore(prevTotalScore => prevTotalScore + score);
      console.log(`User response compared with objectionId: ${lastObjectionId}, similarity score: ${score}`);

      // Unload objectionText and hints after user response is processed
      setObjectionText(null);
      setHints([]);
      
    } catch (error) {
      console.error("Error comparing responses:", error);
    }
  } else {
    console.error("User response is null or lastObjectionId is missing");
  }
}, [lastObjectionId, compareResponses]);

  console.log("Rendering Active component");

  return (
    <div className="relative mt-[170px] flex flex-col items-center">
      <AIStateIndicator isLarge={false} />
      <TranscribeAudio 
        onTranscription={(text) => {
          setTranscribedText(text);
          handleUserResponse(text); // Compare response after user transcribes
          handleConversation(text); // Continue conversation
        }} 
      />
      <GenerateAudio
        setAudio={setAudioUrl}
        setAudioStorageId={setAudioStorageId}
        audio={audioUrl}
        transcription={aiResponse}
      />
      <ObjectionText text={objectionText} />
      <HintCards hints={hints} />
      {/* Pass progressData, totalScore, and usedObjectionsCount to ProgressBar */}
      <ProgressBar 
        numberOfObjections={progressData.numberOfObjections}
        maxScore={progressData.maxScore}
        passingScore={progressData.passingScore}
        score={totalScore}
        usedObjectionsCount={usedObjectionsCount}
      />
      <EndCallButton onEndCall={onEndCall} />
    </div>
  );
};

export default React.memo(Active);

interface ProgressData {
  numberOfObjections: number;
  maxScore: number;
  passingScore: number;
}