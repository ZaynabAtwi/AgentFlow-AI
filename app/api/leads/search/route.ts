import { NextRequest, NextResponse } from "next/server";
import { leadSearchSchema, searchAndSaveLeads } from "@/lib/services/lead-service";
import { rateLimit } from "@/lib/security/rate-limit";
import { requireTenant } from "@/lib/security/tenant";
import { logAudit } from "@/lib/security/audit";

export async function POST(req: NextRequest) {
  const user = await requireTenant();
  const ip = req.headers.get("x-forwarded-for") || "local";
  const limit = rateLimit(`leads-search:${user.id}:${ip}`);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const parsed = leadSearchSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const leads = await searchAndSaveLeads(user.id, parsed.data.industry, parsed.data.location);
  await logAudit(user.id, "leads.search", parsed.data);

  return NextResponse.json({ leads });
}
