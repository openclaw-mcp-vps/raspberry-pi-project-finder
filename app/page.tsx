import Link from "next/link";
import { CheckCircle2, ChevronRight, Wrench } from "lucide-react";

import { SubscriptionButton } from "@/components/SubscriptionButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqItems = [
  {
    question: "How is this better than searching YouTube or Reddit?",
    answer:
      "Each project is normalized into the same structure: skill level, realistic parts list, build time, and learning outcomes. You can filter in seconds instead of comparing inconsistent tutorials for an hour."
  },
  {
    question: "Do I need advanced electronics experience?",
    answer:
      "No. The database includes beginner, intermediate, and advanced projects. You can set a max difficulty and include only the parts you already own."
  },
  {
    question: "How do I unlock access after payment?",
    answer:
      "After checkout, enter the same email used in Stripe inside the unlock form. Once your webhook-confirmed subscription is found, the app sets an access cookie and opens the full project finder."
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Billing is monthly at $7. You can cancel directly from Stripe and retain access through your current billing period."
  }
];

export default function HomePage() {
  return (
    <main className="bg-grid min-h-screen">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-blue-300" />
            <span className="font-mono-ui text-sm tracking-wide text-zinc-200">raspberry-pi-project-finder</span>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800"
          >
            Open project finder
            <ChevronRight className="h-4 w-4" />
          </Link>
        </header>

        <section className="mb-20 grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-7">
            <Badge variant="blue" className="w-fit text-xs">
              Discover Raspberry Pi projects matching your interests
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-100 sm:text-5xl">
              Stop collecting half-finished Pi ideas. Start building projects you can actually complete.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              Raspberry Pi Project Finder matches your current skill, available components, and learning goals to curated builds. Each recommendation includes realistic difficulty, parts required, and expected build time.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <SubscriptionButton>Unlock full finder for $7/month</SubscriptionButton>
              <Link
                href="/search"
                className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-700 px-4 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800"
              >
                See subscriber workspace
              </Link>
            </div>
          </div>

          <Card className="border-blue-500/30 bg-zinc-900/80">
            <CardHeader>
              <CardTitle className="text-zinc-100">Why makers subscribe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-zinc-300">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                Filter by the exact components already in your parts bin.
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                Avoid projects that are too advanced or too basic for your current level.
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                Get prioritized recommendations that fit your interests and available time.
              </p>
              <p className="rounded-md border border-zinc-700 bg-zinc-950/80 p-3 font-mono-ui text-xs text-zinc-400">
                Typical member outcome: choose a new build in under 10 minutes instead of spending an evening scrolling forums.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-20 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-zinc-100">The problem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-zinc-300">
              <p>
                Makers waste hours bouncing between tutorials, GitHub repos, and forum posts that skip key assumptions.
              </p>
              <p>
                Most project lists ignore what parts you already have, so you start builds that stall after one missing component.
              </p>
              <p>
                The result is unfinished projects, unused Raspberry Pi boards, and less confidence to try the next idea.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-zinc-100">The solution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-zinc-300">
              <p>
                Raspberry Pi Project Finder is a curated recommendation engine focused on project fit, not content volume.
              </p>
              <p>
                You enter your skill level, available components, and interests. The app returns projects ranked by practicality and learning value.
              </p>
              <p>
                Every project includes a clear parts list, difficulty rating, outcomes, and build-hour estimate before you commit.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-20">
          <Card className="border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-zinc-100">Pricing</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
              <div className="space-y-4 text-sm text-zinc-300">
                <p>
                  <span className="text-3xl font-semibold text-zinc-100">$7</span>
                  <span className="ml-1 text-zinc-400">/ month</span>
                </p>
                <p>One plan, full access:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                    Full project search and filtering by parts, interests, and skill level
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                    Difficulty and effort estimates to avoid dead-end starts
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                    Personalized recommendation panel based on your active filter profile
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-zinc-700 bg-zinc-950/80 p-4">
                <p className="mb-3 text-sm text-zinc-300">Checkout is hosted by Stripe.</p>
                <SubscriptionButton className="w-full">Buy now</SubscriptionButton>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-10 space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">FAQ</h2>
          <div className="grid gap-4">
            {faqItems.map((item) => (
              <Card key={item.question}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-zinc-100">{item.question}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-zinc-300">{item.answer}</CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
