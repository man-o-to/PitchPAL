// messages.ts
import { query, internalMutation, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";

// Query to list all messages for a specific conversation
export const listMessages = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, { conversationId }) => {
    const messages = await ctx.db
      .query("messages")
      .filter(q => q.eq(q.field("conversationId"), conversationId))
      .order("asc")  // Assuming you want to order messages chronologically
      .collect();    // Collect all messages into an array
    return messages;
  },
});

// mutation to send a message
export const sendMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    sender: v.string(), // 'user' or 'bot'
    text: v.string(),
    // objectionId: v.optional(v.id("objections")),
    correct: v.boolean(),
  },
  handler: async (ctx, { conversationId, sender, text, correct }) => {
    const messageId = await ctx.db.insert("messages", {
      conversationId,
      sender,
      text,
      timestamp: Date.now(), // Current timestamp
      // objectionId,
      correct,
    });

    // Retrieve the current conversation document
    const conversation = await ctx.db.get(conversationId);
    if (!conversation) throw new Error("Conversation not found");

    // Update the conversation's messages array to include the new message
    const updatedMessages = [...conversation.messages, messageId];
    await ctx.db.patch(conversationId, { messages: updatedMessages });

    return messageId;
  },
});

// mutation to update a message
export const updateMessage = mutation({
  args: {
    messageId: v.id("messages"),
    patch: v.object({
      text: v.optional(v.string()),
      // objectionId: v.optional(v.id("objections")),
      correct: v.optional(v.boolean()),
    }),
  },
  handler: async (ctx, { messageId, patch }) => {
    await ctx.db.patch(messageId, patch);
  },
});