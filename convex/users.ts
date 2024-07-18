import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const createUser = internalMutation({
    args: {
        clerkId: v.string(),
        email: v.string(),
        name: v.string(),
        createdAt: v.number(),
    }, handler: async (ctx, args) => {
        await ctx.db.insert('users', {
            clerkId: args.clerkId,
            email: args.email,
            name: args.name,
            createdAt: args.createdAt
        })
    }
})