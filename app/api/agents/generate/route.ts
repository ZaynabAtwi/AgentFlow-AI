import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateAgentFromWebsite } from "@/lib/services/agent-service";
import { requireTenant } from "@/lib/security/tenant";
import { logAudit } from "@/lib/security/audit";

const schema = z.object({
  websiteUrl: z.string().url(),
  leadId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const user = await requireTenant();
  const parsed = schema.safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const agent = await generateAgentFromWebsite(user.id, parsed.data.websiteUrl, parsed.data.leadId);
  await logAudit(user.id, "agents.generate", { websiteUrl: parsed.data.websiteUrl, agentId: agent.id });

  return NextResponse.json({ agent });
}
