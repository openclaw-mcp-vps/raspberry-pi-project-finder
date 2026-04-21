import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";

import type { Project, ProjectFilters } from "@/types/project";

const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  longDescription: z.string(),
  skillLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  difficultyRating: z.number().int().min(1).max(5),
  estimatedHours: z.number().int().positive(),
  board: z.string(),
  components: z.array(z.string()),
  interests: z.array(z.string()),
  outcomes: z.array(z.string()),
  stepsPreview: z.array(z.string())
});

const projectsSchema = z.array(projectSchema);

const subscriberSchema = z.object({
  email: z.string().email(),
  status: z.enum(["active", "inactive"]),
  source: z.enum(["stripe_webhook", "manual"]),
  subscribedAt: z.string(),
  updatedAt: z.string(),
  stripeSessionId: z.string().optional(),
  stripeCustomerId: z.string().optional()
});

const subscribersSchema = z.array(subscriberSchema);

type Subscriber = z.infer<typeof subscriberSchema>;

const projectsFile = path.join(process.cwd(), "data", "projects.json");
const subscribersFile = path.join(process.cwd(), "data", "subscribers.json");

async function safeReadJson(filePath: string): Promise<string> {
  return fs.readFile(filePath, "utf-8");
}

export async function getAllProjects(): Promise<Project[]> {
  const raw = await safeReadJson(projectsFile);
  return projectsSchema.parse(JSON.parse(raw));
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getAllProjects();
  return projects.find((project) => project.id === id);
}

export async function getAllComponents(): Promise<string[]> {
  const projects = await getAllProjects();
  return [...new Set(projects.flatMap((project) => project.components))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export async function getAllInterests(): Promise<string[]> {
  const projects = await getAllProjects();
  return [...new Set(projects.flatMap((project) => project.interests))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export async function filterProjects(filters: ProjectFilters): Promise<Project[]> {
  const projects = await getAllProjects();

  return projects.filter((project) => {
    if (filters.skillLevel && filters.skillLevel !== "Any" && project.skillLevel !== filters.skillLevel) {
      return false;
    }

    if (typeof filters.maxDifficulty === "number" && project.difficultyRating > filters.maxDifficulty) {
      return false;
    }

    if (filters.components?.length) {
      const needed = filters.components.map((item) => item.toLowerCase());
      const pool = project.components.map((item) => item.toLowerCase());
      const hasEveryComponent = needed.every((component) => pool.includes(component));
      if (!hasEveryComponent) {
        return false;
      }
    }

    if (filters.interests?.length) {
      const selected = filters.interests.map((item) => item.toLowerCase());
      const projectInterests = project.interests.map((item) => item.toLowerCase());
      const overlap = selected.some((interest) => projectInterests.includes(interest));
      if (!overlap) {
        return false;
      }
    }

    if (filters.query) {
      const query = filters.query.toLowerCase();
      const haystack = `${project.title} ${project.summary} ${project.longDescription} ${project.components.join(" ")} ${project.interests.join(" ")}`.toLowerCase();
      if (!haystack.includes(query)) {
        return false;
      }
    }

    return true;
  });
}

async function ensureSubscribersFile(): Promise<void> {
  try {
    await fs.access(subscribersFile);
  } catch {
    await fs.mkdir(path.dirname(subscribersFile), { recursive: true });
    await fs.writeFile(subscribersFile, "[]", "utf-8");
  }
}

async function readSubscribers(): Promise<Subscriber[]> {
  await ensureSubscribersFile();
  const raw = await safeReadJson(subscribersFile);
  return subscribersSchema.parse(JSON.parse(raw));
}

async function writeSubscribers(subscribers: Subscriber[]): Promise<void> {
  await fs.writeFile(subscribersFile, JSON.stringify(subscribers, null, 2), "utf-8");
}

export async function upsertSubscriber(entry: {
  email: string;
  status: "active" | "inactive";
  source: "stripe_webhook" | "manual";
  stripeSessionId?: string;
  stripeCustomerId?: string;
}): Promise<void> {
  const normalizedEmail = entry.email.toLowerCase().trim();
  const now = new Date().toISOString();

  const subscribers = await readSubscribers();
  const existingIndex = subscribers.findIndex((subscriber) => subscriber.email === normalizedEmail);

  if (existingIndex >= 0) {
    subscribers[existingIndex] = {
      ...subscribers[existingIndex],
      status: entry.status,
      source: entry.source,
      updatedAt: now,
      stripeSessionId: entry.stripeSessionId ?? subscribers[existingIndex].stripeSessionId,
      stripeCustomerId: entry.stripeCustomerId ?? subscribers[existingIndex].stripeCustomerId
    };
  } else {
    subscribers.push({
      email: normalizedEmail,
      status: entry.status,
      source: entry.source,
      subscribedAt: now,
      updatedAt: now,
      stripeSessionId: entry.stripeSessionId,
      stripeCustomerId: entry.stripeCustomerId
    });
  }

  await writeSubscribers(subscribers);
}

export async function hasActiveSubscription(email: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();
  const subscribers = await readSubscribers();
  const subscriber = subscribers.find((entry) => entry.email === normalizedEmail);
  return subscriber?.status === "active";
}
