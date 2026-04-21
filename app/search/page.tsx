import Link from "next/link";
import { cookies } from "next/headers";

import { SearchExperience } from "@/components/SearchExperience";
import { SubscriptionButton } from "@/components/SubscriptionButton";
import { UnlockAccessForm } from "@/components/UnlockAccessForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllComponents, getAllInterests, getAllProjects } from "@/lib/database";

export const metadata = {
  title: "Project Finder",
  description: "Search Raspberry Pi projects by skills, parts, and interests."
};

export default async function SearchPage() {
  const [cookieStore, projects, components, interests] = await Promise.all([
    cookies(),
    getAllProjects(),
    getAllComponents(),
    getAllInterests()
  ]);

  const hasAccess = cookieStore.get("rp_pf_access")?.value === "active";

  if (!hasAccess) {
    const previewProjects = projects.slice(0, 3);

    return (
      <main className="min-h-screen bg-[#0d1117] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6">
            <Badge variant="blue" className="w-fit">
              Subscriber-only tool
            </Badge>
            <h1 className="text-3xl font-semibold text-zinc-100 sm:text-4xl">Unlock the project finder workspace</h1>
            <p className="max-w-2xl text-zinc-300">
              The full search engine is available to subscribers only. Upgrade once, then filter projects by your parts inventory,
              skill level, interests, and target difficulty.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <SubscriptionButton className="h-11 px-5">Start $7/month subscription</SubscriptionButton>
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-md border border-zinc-700 px-5 text-sm text-zinc-200 transition hover:bg-zinc-800"
              >
                Back to pricing
              </Link>
            </div>
            <UnlockAccessForm />
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-100">Preview projects inside the workspace</h2>
            {previewProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-zinc-100">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-zinc-300">
                  <p>{project.summary}</p>
                  <p className="font-mono-ui text-xs text-zinc-400">{project.skillLevel} · Difficulty {project.difficultyRating}/5</p>
                </CardContent>
              </Card>
            ))}
          </section>
        </div>
      </main>
    );
  }

  return <SearchExperience projects={projects} allComponents={components} allInterests={interests} />;
}
