import { Button } from "@/components/ui/button";

const plans = [
  { name: "Free", price: "$0", value: "FREE", description: "Limited leads, basic demos" },
  { name: "Student", price: "$19/mo", value: "STUDENT", description: "Higher lead volume + outreach" },
  { name: "Professional", price: "$69/mo", value: "PROFESSIONAL", description: "Unlimited pipelines + priority" },
];

export default function BillingPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Billing</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.value} className="gradient-border rounded-xl p-4">
            <p className="text-sm text-zinc-400">{plan.name}</p>
            <p className="mt-2 text-3xl font-bold">{plan.price}</p>
            <p className="mt-2 text-sm text-zinc-300">{plan.description}</p>
            <Button className="mt-4 w-full">Choose {plan.name}</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
