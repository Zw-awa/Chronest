import type { TaskSummary } from "./task-types";

export const sampleTasks: TaskSummary[] = [
  {
    id: 1,
    title: "Morning repo snapshot",
    calendarDate: "2026-06-15",
    startAt: "2026-06-15T09:30:00",
    workingDir: "E:/game-projects/github-projects/Chronest",
    commandPreview: "git add . && git commit -m \"docs: seed Chronest skeleton\"",
    automationKind: "official-git",
    status: "enabled"
  },
  {
    id: 2,
    title: "Launch local exporter",
    calendarDate: "2026-06-18",
    startAt: "2026-06-18T20:00:00",
    workingDir: "E:/tools/exporter",
    commandPreview: "cargo run --release -- export nightly-report",
    automationKind: "shell",
    status: "enabled"
  },
  {
    id: 3,
    title: "Draft AI-assisted release note",
    calendarDate: "2026-06-22",
    startAt: "2026-06-22T14:15:30",
    workingDir: "E:/game-projects/github-projects/Chronest",
    commandPreview: "plugin://official-git/generate-commit-message",
    automationKind: "official-git",
    status: "paused"
  }
];
