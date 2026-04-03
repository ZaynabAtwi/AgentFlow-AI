import { randomUUID } from "crypto";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { scrapeWebsite } from "@/lib/services/scraper";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateAgentFromWebsite(userId: string, websiteUrl: string, leadId?: string) {
  const page = await scrapeWebsite(websiteUrl);

  const fallback = {
    agentName: "AI Business Assistant",
    systemPrompt: `You are a helpful assistant for ${websiteUrl}.`,
    tone: "friendly",
    knowledgeBase: page.text.slice(0, 2000),
    flows: [
      { intent: "greeting", response: "Welcome! How can I help you today?" },
      { intent: "pricing", response: "I can help explain service packages and next steps." },
    ],
  };

  let generated = fallback;
  if (process.env.OPENAI_API_KEY) {
    const completion = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: "Generate JSON with fields agentName, systemPrompt, tone, knowledgeBase, flows[] based on website content.",
        },
        {
          role: "user",
          content: `Website: ${websiteUrl}\nContent: ${page.text.slice(0, 4000)}`,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "agent_blueprint",
          schema: {
            type: "object",
            properties: {
              agentName: { type: "string" },
              systemPrompt: { type: "string" },
              tone: { type: "string" },
              knowledgeBase: { type: "string" },
              flows: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    intent: { type: "string" },
                    response: { type: "string" },
                  },
                  required: ["intent", "response"],
                },
              },
            },
            required: ["agentName", "systemPrompt", "tone", "knowledgeBase", "flows"],
          },
        },
      },
    });

    generated = JSON.parse(completion.output_text);
  }

  return prisma.agent.create({
    data: {
      userId,
      leadId,
      name: generated.agentName,
      systemPrompt: generated.systemPrompt,
      tone: generated.tone,
      knowledgeBase: generated.knowledgeBase,
      flowsJson: generated.flows,
      demoToken: randomUUID(),
      isPublished: true,
    },
  });
}
