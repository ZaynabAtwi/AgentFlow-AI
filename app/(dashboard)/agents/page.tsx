import { prisma } from "@/lib/prisma";

export default async function AgentsPage() {
  const agents = await prisma.agent.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <div>
      <h2 className="text-2xl font-semibold">Agent Studio</h2>
      <p className="mt-2 text-sm text-zinc-400">Edit prompts, tone, knowledge base, and decision flows.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {agents.map((agent) => (
          <div key={agent.id} className="rounded-xl border border-white/10 p-4">
            <h3 className="font-medium">{agent.name}</h3>
            <p className="mt-1 text-xs text-zinc-400">Tone: {agent.tone}</p>
            <p className="mt-3 line-clamp-3 text-sm text-zinc-300">{agent.systemPrompt}</p>
            <p className="mt-2 text-xs text-fuchsia-300">/demo/{agent.demoToken}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
