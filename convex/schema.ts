// convex/schema.ts
import { defineSchema, defineTable } from 'convex/server';
import { migrationsTable } from "convex-helpers/server/migrations";
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
    responses: v.array(v.string()), // Array of responses to overcome the objection
    hints: v.array(v.string()), // Array of hints for the correct responses
    difficulty: v.number(), // Difficulty level
  }).index('by_difficulty', ['difficulty']), // Create an index on difficulty
  settings: defineTable({
    clerkId: v.string(), // Reference to the user’s clerkId
    language: v.string(), // User-selected language
    voice: v.string(), // User-selected voice of the AI
    difficulty: v.number(), // User-selected difficulty level
    trainingMode: v.boolean(), // User-selected training mode
    createdAt: v.number(), // Timestamp
  }),
  accountSettings: defineTable({
    clerkId: v.string(), // Reference to the user’s clerkId
    language: v.string(), // Preferred language
    theme: v.string(), // Theme ('Light', 'Dark', 'System')
    emailNotifications: v.boolean(), // Email notifications preference
    pushNotifications: v.boolean(), // Push notifications preference
    dataSharing: v.boolean(), // Data sharing preference
    timezone: v.string(), // Timezone
    multiFactorAuth: v.boolean(), // Multi-factor authentication status
    subscriptionPlan: v.string(), // Subscription plan
    paymentInfo: v.object({ // Payment information
      cardNumber: v.string(), // Card number
      expiryDate: v.string(), // Expiry date
      cvv: v.string(), // CVV
      billingAddress: v.string(), // Billing address
    }),
  }),
  messages: defineTable({
    conversationId: v.id('conversations'), // Reference to the conversation
    sender: v.string(), // 'user' or 'bot'
    text: v.string(),
    timestamp: v.number(), // Timestamp
    // objectionId: v.optional(v.id('objections')), // Reference to the objection (if applicable)
    correct: v.boolean(), // Whether the response was correct
  }),
  // Add a table for storing temp files
  storage: defineTable({
    audioStorageId: v.optional(v.id('_storage')), // Path to the temporary file
    createdAt: v.number(), // Timestamp
  }),
  migrations: migrationsTable,
});