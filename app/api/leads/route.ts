import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/security/tenant";

export async function GET() {
  const user = await requireTenant();
  const leads = await prisma.lead.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ leads });
}
