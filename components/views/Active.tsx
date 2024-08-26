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

interface ActiveProps {
  conversationId: Id<'conversations'>;
  onEndCall: () => void;
}

const Active = ({ conversationId, onEndCall }: ActiveProps) => {
  const [audioUrl, setAudioUrl] = useState('');
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null);
  const [transcribedText, setTranscribedText] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [hints, setHints] = useState<string[]>([]); // State to store the hints
  const [objectionText, setObjectionText] = useState<string | null>(null); // State to store the objection text


  const sendMessage = useMutation(api.messages.sendMessage);
  const getAiResponse = useAction(api.openai.getConversationResponse);
  const getHintsByObjectionId = useMutation(api.objections.getHintsByObjectionId);
  const getObjectionText = useMutation(api.objections.getObjectionText);

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
        // Format the conversation history with proper type annotations
        const messagesForOpenAI: { role: "user" | "assistant"; content: string }[] = listMessagesQuery.map(message => ({
          role: message.sender === 'user' ? 'user' : 'assistant',
          content: message.text,
        }));
  
        // Add the new transcription to the history
        messagesForOpenAI.push({ role: 'user', content: transcription });
  
        // Get AI response using the conversation API
        const { parsedResponse, objectionId } = await getAiResponse({ input: transcription, messages: messagesForOpenAI });
        setAiResponse(parsedResponse);
  
        // Optionally, store or use the objectionId as needed
        if (objectionId) {
          console.log("Objection ID:", objectionId);
          
          // Fetch the hints associated with the objectionId
          const hintsForObjection = await getHintsByObjectionId({ objectionId: objectionId as Id<"objections"> });
          setHints(hintsForObjection);

          // Fetch the objection text to display
          const objection = await getObjectionText({ objectionId: objectionId as Id<"objections"> });
          setObjectionText(objection);
        }
  
        // Send the transcribed message to the conversation
        await handleSendMessage(transcription, 'user');
  
        // Send the AI's parsed response as a message
        await handleSendMessage(parsedResponse, 'assistant');
      } catch (error) {
        console.error("Error handling conversation:", error);
      }
    }
  }, [conversationId, getAiResponse, handleSendMessage, listMessagesQuery, getHintsByObjectionId]);

  console.log("Rendering Active component");

  return (
    <div className="relative mt-[170px] flex flex-col items-center">
      <AIStateIndicator isLarge={false} />
      <TranscribeAudio 
        onTranscription={(text) => {
          setTranscribedText(text);
          handleConversation(text);
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
      <ProgressBar />
      <EndCallButton onEndCall={onEndCall} />
    </div>
  );
};

export default React.memo(Active);