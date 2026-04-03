import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6">
      <div className="gradient-border rounded-3xl p-10">
        <p className="mb-4 inline-block rounded-full bg-white/5 px-3 py-1 text-xs text-fuchsia-200">AI Agency Operating System</p>
        <h1 className="text-5xl font-bold leading-tight">Find leads. Generate AI demos. Close clients.</h1>
        <p className="mt-4 max-w-2xl text-zinc-300">
          AgentFlow AI helps agencies identify high-intent businesses, auto-generate custom AI agents from websites, and launch outreach campaigns that convert.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/dashboard">
            <Button>Enter Dashboard</Button>
          </Link>
          <Link href="/demo/sample-token" className="rounded-lg border border-white/20 px-4 py-2 text-sm text-zinc-200">View Demo Page</Link>
        </div>
      </div>
    </main>
  );
}
