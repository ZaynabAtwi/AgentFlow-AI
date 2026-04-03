import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireTenant() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user;
}
