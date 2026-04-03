import Link from "next/link";

const items = [
  ["Dashboard", "/dashboard"],
  ["Leads", "/leads"],
  ["Agents", "/agents"],
  ["Campaigns", "/campaigns"],
  ["Billing", "/billing"],
] as const;

export function Sidebar() {
  return (
    <aside className="gradient-border w-64 rounded-2xl p-4">
      <h1 className="mb-6 text-xl font-semibold">AgentFlow AI</h1>
      <nav className="space-y-2">
        {items.map(([label, href]) => (
          <Link key={href} href={href} className="block rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
