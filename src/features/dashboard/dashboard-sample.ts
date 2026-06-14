import { samplePlugins } from "../plugins";
import { sampleScheduler } from "../settings";
import { sampleTasks } from "../tasks";
import type { DashboardSnapshot } from "./dashboard-types";

export const sampleDashboard: DashboardSnapshot = {
  today: "2026-06-13",
  focusDate: "2026-06-15",
  scheduler: sampleScheduler,
  tasks: sampleTasks,
  plugins: samplePlugins
};
