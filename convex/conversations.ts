// conversations.ts
import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createConversation = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const conversationId = await ctx.db.insert("conversations", {
      clerkId,
      startedAt: Date.now(),
      endedAt: 0,
      messages: [],
      progress: 0,
    });
    return conversationId;
  },
});

export const updateProgress = internalMutation({
  args: { conversationId: v.id("conversations"), progress: v.number() },
  handler: async (ctx, { conversationId, progress }) => {
    await ctx.db.patch(conversationId, { progress });
  },
});

export const endConversation = internalMutation({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, { conversationId }) => {
    await ctx.db.patch(conversationId, { endedAt: Date.now() });
  },
});