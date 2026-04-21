"use client";

import type { SkillLevel } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface FiltersState {
  query: string;
  skillLevel: SkillLevel | "Any";
  maxDifficulty: number;
  components: string[];
  interests: string[];
}

interface FilterPanelProps {
  filters: FiltersState;
  allComponents: string[];
  allInterests: string[];
  onChange: (nextFilters: FiltersState) => void;
}

function toggleFromArray(values: string[], value: string) {
  return values.includes(value) ? values.filter((entry) => entry !== value) : [...values, value];
}

export function FilterPanel({ filters, allComponents, allInterests, onChange }: FilterPanelProps) {
  return (
    <aside className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-900/70 p-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-200" htmlFor="search-query">
          Search projects
        </label>
        <Input
          id="search-query"
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
          placeholder="Try: garden, home lab, camera, security"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-200" htmlFor="skill-level">
          Skill level
        </label>
        <select
          id="skill-level"
          value={filters.skillLevel}
          onChange={(event) => onChange({ ...filters, skillLevel: event.target.value as FiltersState["skillLevel"] })}
          className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
        >
          <option value="Any">Any level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-zinc-200" htmlFor="difficulty">
          Max difficulty: {filters.maxDifficulty}/5
        </label>
        <input
          id="difficulty"
          type="range"
          min={1}
          max={5}
          value={filters.maxDifficulty}
          onChange={(event) => onChange({ ...filters, maxDifficulty: Number(event.target.value) })}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-700 accent-blue-400"
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-zinc-200">Available components</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {allComponents.map((component) => {
            const checked = filters.components.includes(component);
            return (
              <label key={component} className="flex items-center gap-2 text-xs text-zinc-300">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onChange({
                      ...filters,
                      components: toggleFromArray(filters.components, component)
                    })
                  }
                  className="h-4 w-4 rounded border-zinc-600 bg-zinc-900 text-blue-400"
                />
                <span>{component}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-zinc-200">Interest areas</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {allInterests.map((interest) => {
            const checked = filters.interests.includes(interest);
            return (
              <label key={interest} className="flex items-center gap-2 text-xs text-zinc-300">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onChange({
                      ...filters,
                      interests: toggleFromArray(filters.interests, interest)
                    })
                  }
                  className="h-4 w-4 rounded border-zinc-600 bg-zinc-900 text-blue-400"
                />
                <span>{interest}</span>
              </label>
            );
          })}
        </div>
      </div>

      <Button
        variant="secondary"
        className="w-full"
        onClick={() =>
          onChange({
            query: "",
            skillLevel: "Any",
            maxDifficulty: 5,
            components: [],
            interests: []
          })
        }
      >
        Clear all filters
      </Button>
    </aside>
  );
}
