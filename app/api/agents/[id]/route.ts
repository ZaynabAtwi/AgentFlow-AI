import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/security/tenant";

const schema = z.object({
  systemPrompt: z.string().min(10),
  tone: z.string().min(2),
  knowledgeBase: z.string().min(10),
  flowsJson: z.any().optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireTenant();
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const existing = await prisma.agent.findFirst({ where: { id: params.id, userId: user.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const agent = await prisma.agent.update({
    where: { id: params.id },
    data: parsed.data,
  });

  return NextResponse.json({ agent });

