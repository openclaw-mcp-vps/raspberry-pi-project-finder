import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { filterProjects } from "@/lib/database";

export const runtime = "nodejs";

function getQueryArray(raw: string | null): string[] {
  if (!raw) {
    return [];
  }

  return raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get("rp_pf_access")?.value === "active";

  if (!hasAccess) {
    return NextResponse.json({ error: "Subscriber access required." }, { status: 403 });
  }

  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const skillLevel = url.searchParams.get("skill") ?? "Any";
  const maxDifficultyParam = url.searchParams.get("maxDifficulty");
  const maxDifficulty = maxDifficultyParam ? Number(maxDifficultyParam) : undefined;

  const projects = await filterProjects({
    query: q,
    skillLevel: skillLevel as "Beginner" | "Intermediate" | "Advanced" | "Any",
    components: getQueryArray(url.searchParams.get("components")),
    interests: getQueryArray(url.searchParams.get("interests")),
    maxDifficulty: Number.isFinite(maxDifficulty) ? maxDifficulty : undefined
  });

  return NextResponse.json({
    total: projects.length,
    projects
  });
}
