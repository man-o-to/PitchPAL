import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    clerkId: v.string(), // Unique user ID from Clerk or another authentication provider
    name: v.string(),
    email: v.string(),
    createdAt: v.number(), // Timestamp
    avatarUrl: v.optional(v.string()),
  }),
  conversations: defineTable({
    clerkId: v.string(), // Reference to the user’s clerkId
    startedAt: v.number(), // Timestamp
    endedAt: v.number(), // Timestamp
    messages: v.array(v.id('messages')), // Array of message IDs
    progress: v.number(), // Progress towards closing the sale
  }),
  objections: defineTable({
    text: v.string(), // Objection text
    correctResponse: v.string(), // Correct response to overcome the objection
    difficulty: v.number(), // Difficulty level
  }),
  settings: defineTable({
    clerkId: v.string(), // Reference to the user’s clerkId
    language: v.string(), // User-selected language
    voice: v.string(), // User-selected voice of the AI
    difficulty: v.number(), // User-selected difficulty level
    trainingMode: v.boolean(), // User-selected training mode
    createdAt: v.number(), // Timestamp
  }),
  messages: defineTable({
    conversationId: v.id('conversations'), // Reference to the conversation
    sender: v.string(), // 'user' or 'bot'
    text: v.string(),
    timestamp: v.number(), // Timestamp
    objectionId: v.optional(v.id('objections')), // Reference to the objection (if applicable)
    correct: v.boolean(), // Whether the response was correct
  }),
});