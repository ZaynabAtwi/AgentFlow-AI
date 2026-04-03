import { prisma } from "@/lib/prisma";

export async function logAudit(userId: string, action: string, meta?: Record<string, unknown>) {
  await prisma.auditLog.create({
    data: { userId, action, meta },
  });
}
