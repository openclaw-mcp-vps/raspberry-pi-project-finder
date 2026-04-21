"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UnlockAccessForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/subscription/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        setError(payload.error ?? "We could not verify this subscription yet.");
        return;
      }

      router.refresh();
    } catch {
      setError("Network error while verifying your subscription.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-xl border border-zinc-700 bg-zinc-900/70 p-4">
      <p className="text-sm text-zinc-200">Already paid? Unlock with the same email used at checkout.</p>
      <Input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      {error ? <p className="text-xs text-rose-300">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Checking..." : "Unlock my access"}
      </Button>
    </form>
  );
}
