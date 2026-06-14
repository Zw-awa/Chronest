import type { PluginManifest } from "../plugins";
import type { Language, SchedulerOverview } from "../settings";
import type { TaskSummary } from "../tasks";

export type DashboardSnapshot = {
  today: string;
  focusDate: string;
  scheduler: SchedulerOverview;
  tasks: TaskSummary[];
  plugins: PluginManifest[];
};

export type { Language, PluginManifest, SchedulerOverview, TaskSummary };
