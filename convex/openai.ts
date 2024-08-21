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
        model: "gpt-4", // or another model of your choice
        messages: messages,
      });

      return completion.choices[0].message?.content || "No response.";
    } catch (error) {
      console.error("Error communicating with OpenAI", error);
      throw new Error("Failed to get AI response.");
    }
  },
});

// export const chat = internalMutation({
//   args: {
//     body: v.string(),
//     conversationId: v.id("conversations"),
//   },
//   handler: async (ctx, { body, conversationId }) => {
//     // Fetch the current conversation
//     const conversation = await ctx.db.get(conversationId);
//     if (!conversation) throw new Error("Conversation not found");

//     // Insert the user's message
//     const userMessageId = await ctx.db.insert("messages", {
//       conversationId,
//       sender: "user",
//       text: body,
//       timestamp: Date.now(),
//       correct: false, // Assuming this is a placeholder; adjust based on your logic
//     });

//     // Create a bot message entry
//     const botMessageId = await ctx.db.insert("messages", {
//       conversationId,
//       sender: "bot",
//       text: "", // Placeholder text, will be updated later
//       timestamp: Date.now(),
//       correct: false, // Placeholder
//     });

//     // Update the conversation's messages array to include the new messages
//     const updatedMessages = [...conversation.messages, userMessageId, botMessageId];
//     await ctx.db.patch(conversationId, { messages: updatedMessages });

//     // Create the chat prompt based on existing messages
//     const gptMessages: { role: "system" | "user" | "assistant"; content: string }[] = [];
//     for (const messageId of conversation.messages) {
//       const msg = await ctx.db.get(messageId);
//       if (msg) {
//         gptMessages.push({
//           role: msg.sender === "user" ? "user" : "assistant",
//           content: msg.text,
//         });
//       }
//     }

//     // Add the user message to the prompt
//     gptMessages.push({ role: "user", content: body });

//     try {
//       // Get the response from OpenAI
//       const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: gptMessages,
//       });

//       // Update the bot's message with the OpenAI response
//       const openAIResponse = response.choices[0].message?.content || "";
//       await ctx.db.patch(botMessageId, {
//         text: openAIResponse,
//         timestamp: Date.now(),
//         correct: true, // Assuming the bot's response is correct
//       });
      
//     } catch (error) {
//       // Type guard to ensure error is an instance of Error
//       const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

//       // Handle errors and update bot message with error information
//       await ctx.db.patch(botMessageId, {
//         text: `Error: ${errorMessage}`,
//         correct: false,
//       });
//       throw new Error(`OpenAI error: ${errorMessage}`);
//     }

//     return { userMessageId, botMessageId };
//   },
// });