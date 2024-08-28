// convex/openai.ts
import { action, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import OpenAI, { toFile } from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";
import * as base64 from 'base64-js';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const transcribeAudioAction = action({
    args: { audioData: v.string() },
    handler: async (_, { audioData }) => {
      try {
        // Decode Base64 to binary
        const audioBuffer = base64.toByteArray(audioData);
   
        // Use OpenAI API to transcribe the audio
        const transcription = await openai.audio.transcriptions.create({
          file: await toFile(audioBuffer, "audio.wav", {
          }),
          model: "whisper-1",
        });
   
        return transcription.text;
      } catch (error) {
        console.error("Error during transcription:", error);
        return null;
      }
    },
});

export const generateSpeechAction = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (_, { input, voice }) => {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice as SpeechCreateParams['voice'],
      input,
    });

    const buffer = await mp3.arrayBuffer();
    return buffer;
  },
});

export const getConversationResponse = action({
  args: { input: v.string(), messages: v.array(v.object({
    role: v.union(v.literal("system"), v.literal("user"), v.literal("assistant")),
    content: v.string(),
  })) },
  handler: async (_, { input, messages }) => {
    try {
      // Add the new input to the messages
      messages.push({ role: "user", content: input });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o", // or another model of your choice
        messages: messages,
      });

      // Get the AI response
      const aiResponse = completion.choices[0].message?.content || "No response.";

      // Extract the objection ID and the objection text
      const objectionIdMatch = aiResponse.match(/#\[(\w+)\]/);
      const objectionId = objectionIdMatch ? objectionIdMatch[1] : null;

      // Strip out the objection ID from the response text
      const parsedResponse = aiResponse.replace(/#\[\w+\]\s*/, '');

      return {
        parsedResponse,
        objectionId,
      };
    } catch (error) {
      console.error("Error communicating with OpenAI", error);
      throw new Error("Failed to get AI response.");
    }
  },
});