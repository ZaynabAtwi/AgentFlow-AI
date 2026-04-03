import { prisma } from "@/lib/prisma";

export default async function DemoPage({ params }: { params: { token: string } }) {
  const agent = await prisma.agent.findUnique({ where: { demoToken: params.token }, include: { lead: true } });

  if (!agent) return <div className="p-10">Demo not found.</div>;

  return (
    <main className="mx-auto max-w-3xl p-8">
      <div className="gradient-border rounded-2xl p-8">
        <p className="text-sm text-zinc-400">{agent.lead?.name || "Business Demo"}</p>
        <h1 className="mt-2 text-3xl font-bold">{agent.name}</h1>
        <p className="mt-4 text-zinc-300">{agent.systemPrompt}</p>
        <div className="mt-6 rounded-xl border border-white/10 p-4">
          <p className="text-sm text-zinc-400">Live Preview</p>
          <p className="mt-2 text-sm">Hi! I&apos;m your AI assistant. Ask about services, pricing, or booking.</p>
        </div>
        <button className="mt-6 rounded-lg bg-brand-gradient px-4 py-2 text-sm font-medium">Activate this AI for your business</button>
      </div>
    </main>
  );
}
