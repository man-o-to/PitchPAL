import { ConvexError, v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

// Retrieve user settings query
export const getUserSettings = query({
    args: { clerkId: v.string() }, // Updated to use clerkId
    handler: async (ctx, args) => {
        const { clerkId } = args;

        // Query to get settings by clerkId
        const settings = await ctx.db
            .query("settings")
            .filter((q) => q.eq(q.field("clerkId"), clerkId))
            .first();

        if (!settings) {
            throw new ConvexError("Settings not found for this user");
        }

        return settings;
    },
});

// Update settings mutation
export const updateSettings = mutation({
    args: {
        clerkId: v.string(), // Updated to use clerkId
        language: v.string(),
        voice: v.string(),
        difficulty: v.number(),
        trainingMode: v.boolean(),
    },
    async handler(ctx, args) {
        const { clerkId, language, voice, difficulty, trainingMode } = args;

        // Ensure the user has a settings entry
        const existingSettings = await ctx.db
            .query("settings")
            .filter((q) => q.eq(q.field("clerkId"), clerkId))
            .first();

        if (existingSettings) {
            // Update existing settings
            await ctx.db.patch(existingSettings._id, {
                language,
                voice,
                difficulty,
                trainingMode,
                createdAt: Date.now(),
            });
        } else {
            // Create new settings entry
            await ctx.db.insert("settings", {
                clerkId,
                language,
                voice,
                difficulty,
                trainingMode,
                createdAt: Date.now(),
            });
        }
    },
});