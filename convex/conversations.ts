// conversations.ts
import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Helper function to get personality description based on difficulty
const getPersonalityDescription = (difficulty: number) => {
  switch (difficulty) {
    case 1:
      return "a mild-mannered, slightly hesitant prospect.";
    case 2:
      return "a somewhat skeptical and cautious prospect.";
    case 3:
      return "a challenging, harsh, slightly rude, and hard-to-convince prospect.";
    default:
      return "a balanced prospect with varying levels of skepticism.";
  }
};

export const createConversation = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    // Create the conversation and store its ID
    const conversationId = await ctx.db.insert("conversations", {
      clerkId,
      startedAt: Date.now(),
      endedAt: 0,
      messages: [],
      progress: 0,
    });

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

    // Format each objection as `#[objectionId] objectionText`
    const formattedObjections = objections.map(objection => {
      return `#[${objection._id}] ${objection.text}`;
    }).join('\n');

    // Get the personality description based on difficulty
    const personalityDescription = getPersonalityDescription(difficulty);

    // Construct the system message with objections and personality
    const systemMessageText = `
      You are a prospective client receiving a cold call from a salesperson. 
      Your role is to simulate a realistic sales interaction, including objections, hesitations, and questions that a typical prospect might have. 
      
      Your personality for this interaction is: ${personalityDescription}
      
      Adapt your responses based on the context provided by the salesperson, and adjust your objections or level of interest according to their persuasiveness, clarity, and approach. 
      Your goal is to provide a challenging yet constructive experience for the user to practice and improve their objection-handling and sales techniques.
      
      When presenting an objection, always start your sentence with the objection ID in the format #[objectionId]. 
      For example: #[objection123] I am not interested because I already have a supplier. 
      After the ID, state the objection clearly and naturally within the conversation.
      
      Below are the objections you may use in the conversation and their respective objectionId's:
      ${formattedObjections}
    `.trim();

    // Add the initial system prompt as the first message
    const systemMessageId = await ctx.db.insert("messages", {
      conversationId,
      sender: "system",
      text: systemMessageText,
      timestamp: Date.now(),
      correct: true,
    });

    // Update the conversation with the system message
    await ctx.db.patch(conversationId, {
      messages: [systemMessageId],
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