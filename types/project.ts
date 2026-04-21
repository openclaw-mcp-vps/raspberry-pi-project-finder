export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Project {
  id: string;
  title: string;
  summary: string;
  longDescription: string;
  skillLevel: SkillLevel;
  difficultyRating: number;
  estimatedHours: number;
  board: string;
  components: string[];
  interests: string[];
  outcomes: string[];
  stepsPreview: string[];
}

export interface ProjectFilters {
  query?: string;
  skillLevel?: SkillLevel | "Any";
  components?: string[];
  interests?: string[];
  maxDifficulty?: number;
}
