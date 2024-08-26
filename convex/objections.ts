// convex/objections.ts

import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Function to fetch and format objections
export const getFormattedObjections = internalQuery({
  args: { difficulty: v.number() }, // Accept difficulty level as an argument
  handler: async (ctx, { difficulty }) => {
    // Fetch objections based on difficulty
    const objections = await ctx.db.query('objections')
      .withIndex('by_difficulty', q => q.lte('difficulty', difficulty))
      .collect();

    // Format each objection as `#[objectionId] objectionText`
    const formattedObjections = objections.map(objection => {
      return `#[${objection._id}] ${objection.text}`;
    });

    // Join all formatted objections into a single string with line breaks
    return formattedObjections.join('\n');
  },
});

// Get hints from parsed objectionId
export const getHintsByObjectionId = mutation({
  args: { objectionId: v.id("objections") },
  handler: async (ctx, { objectionId }) => {
    const objection = await ctx.db.get(objectionId);
    return objection?.hints || [];
  },
});

// Get text from parsed objectionId
export const getObjectionText = mutation({
  args: { objectionId: v.id("objections") },
  handler: async (ctx, { objectionId }) => {
    const objection = await ctx.db.get(objectionId);
    return objection?.text || null;
  },
});