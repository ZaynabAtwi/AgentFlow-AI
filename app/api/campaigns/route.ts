import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/security/tenant";
import { sendOutreach } from "@/lib/services/outreach-service";

const schema = z.object({
  name: z.string().min(3),
  leadIds: z.array(z.string()).min(1),
  emailMessage: z.string().min(10),
  smsMessage: z.string().min(10),
});

export async function POST(req: NextRequest) {
  const user = await requireTenant();
  const parsed = schema.safeParse(await req.json());

  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const campaign = await prisma.campaign.create({
    data: {
      userId: user.id,
      name: parsed.data.name,
      leadIds: parsed.data.leadIds,
      emailMessage: parsed.data.emailMessage,
      smsMessage: parsed.data.smsMessage,
      status: "RUNNING",
    },
  });

  const leads = await prisma.lead.findMany({ where: { id: { in: parsed.data.leadIds }, userId: user.id } });

  await Promise.all(
    leads.map((lead) =>
      sendOutreach(
        lead.email,
        lead.phone,
        `Quick AI win for ${lead.name}`,
        parsed.data.emailMessage.replaceAll("{{business_name}}", lead.name),
        parsed.data.smsMessage.replaceAll("{{business_name}}", lead.name)
      )
    )
  );

  return NextResponse.json({ campaign, contacted: leads.length });
}
