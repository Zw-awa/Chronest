import type { SchedulerOverview } from "./settings-types";

export const sampleScheduler: SchedulerOverview = {
  runtime: "calendar-daemon",
  workerStatus: "planned",
  storage: "sqlite",
  secretStrategy: "metadata in SQLite, secrets in OS storage next",
  notes: [
    "Jobs should still execute when the window is hidden; confirm whether full app shutdown must also preserve runs.",
    "Plugins need explicit permissions for exec, fs, network, git, and secrets.",
    "Git automation should support empty-tree guards, dry-run preview, and commit message generation hooks."
  ]
};
