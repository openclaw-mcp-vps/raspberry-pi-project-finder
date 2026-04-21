import { NextResponse } from "next/server";

import { upsertSubscriber } from "@/lib/database";
import { parseStripeWebhookEvent, verifyStripeWebhookSignature } from "@/lib/lemonsqueezy";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 });
  }

  const isValid = verifyStripeWebhookSignature({
    rawBody,
    signatureHeader: signature,
    webhookSecret
  });

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = parseStripeWebhookEvent(rawBody);

  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object as {
      id?: string;
      customer?: string;
      customer_email?: string;
      customer_details?: {
        email?: string;
      };
    };

    const email = checkoutSession.customer_details?.email ?? checkoutSession.customer_email;

    if (email) {
      await upsertSubscriber({
        email,
        status: "active",
        source: "stripe_webhook",
        stripeSessionId: checkoutSession.id,
        stripeCustomerId: checkoutSession.customer
      });
    }
  }

  return NextResponse.json({ received: true });
}
