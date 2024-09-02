// Purpose: Provide feedback based on user performance.

import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";

export const getProgressNumbers = mutation({
    args: { clerkId: v.string() },
    handler: async (ctx, { clerkId }) => {
      // Fetch user settings to get the selected difficulty level
      const userSettings = await ctx.db.query("settings")
        .filter(q => q.eq(q.field("clerkId"), clerkId))
        .first();
  
      if (!userSettings) {
        throw new Error("User settings not found.");
      }
  
      const difficulty = userSettings.difficulty;
  
      // Retrieve objections for the selected difficulty level
      const objections = await ctx.db.query('objections')
        .withIndex('by_difficulty', q => q.lte('difficulty', difficulty))
        .collect();
  
      const numberOfObjections = objections.length;
      const maxScore = numberOfObjections * 10;
      const passingScore = maxScore * 0.5;
  
      return {
        numberOfObjections,
        maxScore,
        passingScore,
      };
    },
  });