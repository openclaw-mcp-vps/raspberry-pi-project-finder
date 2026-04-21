"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Sparkles } from "lucide-react";

import type { Project } from "@/types/project";
import { FilterPanel, type FiltersState } from "@/components/FilterPanel";
import { ProjectCard } from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";

interface SearchExperienceProps {
  projects: Project[];
  allComponents: string[];
  allInterests: string[];
}

const initialFilters: FiltersState = {
  query: "",
  skillLevel: "Any",
  maxDifficulty: 5,
  components: [],
  interests: []
};

export function SearchExperience({ projects, allComponents, allInterests }: SearchExperienceProps) {
  const [filters, setFilters] = useState<FiltersState>(initialFilters);

  const fuse = useMemo(
    () =>
      new Fuse(projects, {
        keys: ["title", "summary", "longDescription", "components", "interests", "outcomes"],
        threshold: 0.3,
        includeScore: true,
        ignoreLocation: true
      }),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    const byConstraints = projects.filter((project) => {
      if (filters.skillLevel !== "Any" && project.skillLevel !== filters.skillLevel) {
        return false;
      }

      if (project.difficultyRating > filters.maxDifficulty) {
        return false;
      }

      if (filters.components.length > 0) {
        const hasEveryComponent = filters.components.every((component) => project.components.includes(component));
        if (!hasEveryComponent) {
          return false;
        }
      }

      if (filters.interests.length > 0) {
        const hasMatchingInterest = filters.interests.some((interest) => project.interests.includes(interest));
        if (!hasMatchingInterest) {
          return false;
        }
      }

      return true;
    });

    if (!filters.query.trim()) {
      return byConstraints;
    }

    const weightedMatches = fuse.search(filters.query.trim());
    const scoreById = new Map(weightedMatches.map((entry) => [entry.item.id, entry.score ?? 0]));

    return byConstraints
      .filter((project) => scoreById.has(project.id))
      .sort((a, b) => (scoreById.get(a.id) ?? 1) - (scoreById.get(b.id) ?? 1));
  }, [filters, fuse, projects]);

  const recommendations = useMemo(() => {
    if (filters.interests.length === 0 && filters.components.length === 0) {
      return filteredProjects.slice(0, 3);
    }

    return [...filteredProjects]
      .map((project) => {
        const interestScore = filters.interests.filter((interest) => project.interests.includes(interest)).length;
        const componentScore = filters.components.filter((component) => project.components.includes(component)).length;
        const skillBonus = filters.skillLevel !== "Any" && filters.skillLevel === project.skillLevel ? 1 : 0;
        return {
          project,
          score: interestScore * 2 + componentScore * 1.5 + skillBonus
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.project);
  }, [filteredProjects, filters.components, filters.interests, filters.skillLevel]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-blue-300">Subscriber Workspace</p>
            <h1 className="text-3xl font-semibold text-zinc-100">Find projects you can finish this month</h1>
            <p className="max-w-2xl text-sm text-zinc-300">
              Filter by your current components, desired learning area, and acceptable difficulty. Results update instantly, including
              priority recommendations tailored to your selections.
            </p>
          </div>
          <Badge variant="blue" className="w-fit text-xs">
            {filteredProjects.length} matching projects
          </Badge>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <FilterPanel
          filters={filters}
          allComponents={allComponents}
          allInterests={allInterests}
          onChange={setFilters}
        />

        <div className="space-y-8">
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-300" />
              <h2 className="text-sm font-semibold text-blue-100">Personalized recommendations</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {recommendations.map((project) => (
                <ProjectCard key={`rec-${project.id}`} project={project} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-100">All matching projects</h2>
            {filteredProjects.length === 0 ? (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 text-sm text-zinc-300">
                No projects match the current filters. Try removing one component requirement or increasing max difficulty.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
