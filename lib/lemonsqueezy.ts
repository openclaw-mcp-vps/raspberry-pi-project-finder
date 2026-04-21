import crypto from "node:crypto";

import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

export const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ?? "";

export interface StripeWebhookEvent {
  id?: string;
  type: string;
  data: {
    object: Record<string, unknown>;
  };
}

export function initializeLemonSqueezySdk(apiKey?: string) {
  if (!apiKey) {
    return;
  }

  lemonSqueezySetup({ apiKey });
}

export function parseStripeWebhookEvent(rawBody: string): StripeWebhookEvent {
  return JSON.parse(rawBody) as StripeWebhookEvent;
}

export function verifyStripeWebhookSignature({
  rawBody,
  signatureHeader,
  webhookSecret
}: {
  rawBody: string;
  signatureHeader: string | null;
  webhookSecret: string;
}): boolean {
  if (!signatureHeader) {
    return false;
  }

  const segments = signatureHeader.split(",");
  const timestamp = segments.find((segment) => segment.startsWith("t="))?.split("=")[1];
  const signature = segments.find((segment) => segment.startsWith("v1="))?.split("=")[1];

  if (!timestamp || !signature) {
    return false;
  }

  const payload = `${timestamp}.${rawBody}`;
  const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(payload).digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature, "utf-8");
  const providedBuffer = Buffer.from(signature, "utf-8");

  if (expectedBuffer.length !== providedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, providedBuffer);
}
