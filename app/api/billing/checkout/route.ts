import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { requireTenant } from "@/lib/security/tenant";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

const PLAN_TO_PRICE: Record<string, string | undefined> = {
  STUDENT: process.env.STRIPE_PRICE_STUDENT,
  PROFESSIONAL: process.env.STRIPE_PRICE_PRO,
};

export async function POST(req: NextRequest) {
  const user = await requireTenant();
  const { plan } = await req.json();

  if (!stripe) {
    return NextResponse.json({ url: null, message: "Stripe not configured" });
  }

  const price = PLAN_TO_PRICE[plan];
  if (!price) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    success_url: `${process.env.NEXTAUTH_URL}/billing?success=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/billing?canceled=true`,
    line_items: [{ price, quantity: 1 }],
    customer_email: user.email || undefined,
    metadata: { userId: user.id, plan },
  });

  return NextResponse.json({ url: session.url });
}
