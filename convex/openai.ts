// convex/openai.ts
import { action } from "./_generated/server";
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