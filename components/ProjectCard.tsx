import Link from "next/link";
import { ArrowRight, Clock3, Gauge, Wrench } from "lucide-react";

import type { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function skillBadgeVariant(skillLevel: Project["skillLevel"]) {
  if (skillLevel === "Beginner") {
    return "green" as const;
  }

  if (skillLevel === "Intermediate") {
    return "amber" as const;
  }

  return "rose" as const;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full border-zinc-800/90 bg-zinc-900/70 backdrop-blur-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <Badge variant={skillBadgeVariant(project.skillLevel)}>{project.skillLevel}</Badge>
          <span className="font-mono-ui text-xs text-zinc-400">{project.board}</span>
        </div>
        <CardTitle className="text-xl text-zinc-100">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-zinc-300">{project.summary}</p>
        <div className="grid gap-2 text-xs text-zinc-300 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <Gauge className="h-3.5 w-3.5 text-blue-300" />
            Difficulty {project.difficultyRating}/5
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className="h-3.5 w-3.5 text-blue-300" />
            {project.estimatedHours} hrs
          </div>
          <div className="flex items-center gap-2">
            <Wrench className="h-3.5 w-3.5 text-blue-300" />
            {project.components.length} parts
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.interests.slice(0, 3).map((interest) => (
            <Badge key={interest} variant="default" className="text-[11px]">
              {interest}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/project/${project.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200"
        >
          View full project
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
