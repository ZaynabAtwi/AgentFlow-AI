import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export async function POST(req: NextRequest) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: true });
  }

  const body = await req.text();
  const signature = headers().get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const plan = session.metadata?.plan;
    if (userId && plan) {
      await prisma.user.update({
        where: { id: userId },
        data: { subscriptionPlan: plan === "PROFESSIONAL" ? "PROFESSIONAL" : "STUDENT" },
      });
    }
  }

  return NextResponse.json({ received: true });
}
