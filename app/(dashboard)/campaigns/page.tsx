import { prisma } from "@/lib/prisma";

export default async function CampaignsPage() {
  const campaigns = await prisma.campaign.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h2 className="text-2xl font-semibold">Campaigns</h2>
      <ul className="mt-4 space-y-3">
        {campaigns.map((campaign) => (
          <li key={campaign.id} className="rounded-xl border border-white/10 p-4">
            <p className="font-medium">{campaign.name}</p>
            <p className="text-sm text-zinc-400">Status: {campaign.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
