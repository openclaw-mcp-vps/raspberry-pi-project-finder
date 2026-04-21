import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllProjects, getProjectById } from "@/lib/database";

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get("rp_pf_access")?.value === "active";

  if (!hasAccess) {
    redirect("/search");
  }

  const project = await getProjectById(id);
  if (!project) {
    notFound();
  }

  const relatedProjects = (await getAllProjects())
    .filter((candidate) => candidate.id !== project.id)
    .map((candidate) => ({
      project: candidate,
      score: candidate.interests.filter((interest) => project.interests.includes(interest)).length
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((entry) => entry.project);

  return (
    <main className="min-h-screen bg-[#0d1117] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge variant="blue">{project.skillLevel}</Badge>
            <Badge variant="default">Difficulty {project.difficultyRating}/5</Badge>
            <Badge variant="default">{project.estimatedHours} hours</Badge>
          </div>
          <h1 className="text-3xl font-semibold text-zinc-100">{project.title}</h1>
          <p className="mt-3 max-w-3xl text-zinc-300">{project.longDescription}</p>
          <div className="mt-6">
            <Link
              href="/search"
              className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-700 px-4 text-sm text-zinc-200 transition hover:bg-zinc-800"
            >
              Back to search
            </Link>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-zinc-100">Required parts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-zinc-300">
                {project.components.map((component) => (
                  <li key={component} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                    {component}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-zinc-100">What you will learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-zinc-300">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-300" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-zinc-100">Build sequence</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm text-zinc-300">
                {project.stepsPreview.map((step, index) => (
                  <li key={step}>
                    <span className="font-semibold text-zinc-100">{index + 1}. </span>
                    {step}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-100">Similar projects</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedProjects.map((related) => (
              <Card key={related.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-zinc-100">{related.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-zinc-300">
                  <p>{related.summary}</p>
                  <Link href={`/project/${related.id}`} className="text-sm font-semibold text-blue-300 hover:text-blue-200">
                    Open project
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
