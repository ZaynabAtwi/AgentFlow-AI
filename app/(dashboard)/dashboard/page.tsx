import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [leadCount, agentCount, campaignCount] = await Promise.all([
    prisma.lead.count(),
    prisma.agent.count(),
    prisma.campaign.count(),
  ]);

  return (
    <div>
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[{ label: "Leads", value: leadCount }, { label: "Agents", value: agentCount }, { label: "Campaigns", value: campaignCount }].map((card) => (
          <div key={card.label} className="rounded-xl border border-white/10 p-4">
            <p className="text-sm text-zinc-400">{card.label}</p>
            <p className="mt-2 text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
