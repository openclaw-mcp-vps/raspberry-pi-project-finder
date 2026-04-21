import { NextResponse } from "next/server";
import { z } from "zod";

import { hasActiveSubscription } from "@/lib/database";

export const runtime = "nodejs";

const payloadSchema = z.object({
  email: z.string().email()
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const active = await hasActiveSubscription(parsed.data.email);

  if (!active) {
    return NextResponse.json(
      {
        error: "No active subscription found for this email yet. Complete checkout and wait for webhook delivery, then try again."
      },
      { status: 403 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: "rp_pf_access",
    value: "active",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30
  });

  return response;
}
