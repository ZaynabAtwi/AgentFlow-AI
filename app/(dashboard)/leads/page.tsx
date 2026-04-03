import { prisma } from "@/lib/prisma";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <div>
      <h2 className="text-2xl font-semibold">Leads</h2>
      <p className="mt-2 text-sm text-zinc-400">Sortable/filterable-ready table for high-intent leads.</p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-zinc-300">
            <tr>
              <th className="p-3">Business</th>
              <th>Website</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-white/5">
                <td className="p-3">{lead.name}</td>
                <td>{lead.website || "-"}</td>
                <td>{lead.score}</td>
                <td>{lead.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
