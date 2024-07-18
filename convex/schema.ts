import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    clerkId: v.string(), // Unique user ID from Clerk or another authentication provider
    name: v.string(),
    email: v.string(),
    createdAt: v.number(), // Timestamp
  }),
  conversations: defineTable({
    userId: v.id('users'), // Reference to the user
    conversationId: v.string(), // Unique conversation ID
    scenarioId: v.string(), // Reference to the scenario
    startedAt: v.number(), // Timestamp
    endedAt: v.number(), // Timestamp
    messages: v.array(v.string()), // Array of message IDs
    progress: v.number(), // Progress towards closing the sale
  }),
  scenarios: defineTable({
    scenarioId: v.string(), // Unique scenario ID
    name: v.string(),
    description: v.string(),
    difficulty: v.number(), // Difficulty level
    createdAt: v.number(), // Timestamp
    objections: v.array(v.string()), // Array of objection IDs
  }),
  objections: defineTable({
    objectionId: v.string(), // Unique objection ID
    text: v.string(), // Objection text
    correctResponse: v.string(), // Correct response to overcome the objection
    scenarioId: v.string(), // Reference to the scenario
  }),
  settings: defineTable({
    userId: v.id('users'), // Reference to the user
    scenarioId: v.string(), // Reference to the selected scenario
    difficulty: v.number(), // User-selected difficulty level
    createdAt: v.number(), // Timestamp
  }),
  messages: defineTable({
    messageId: v.string(), // Unique message ID
    conversationId: v.id('conversations'), // Reference to the conversation
    sender: v.string(), // 'user' or 'bot'
    text: v.string(),
    timestamp: v.number(), // Timestamp
    objectionId: v.optional(v.string()), // Reference to the objection (if applicable)
    correct: v.boolean(), // Whether the response was correct
  }),
});