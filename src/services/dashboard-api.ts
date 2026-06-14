import { invoke } from "@tauri-apps/api/core";
import type { DashboardSnapshot } from "@features/dashboard";

export async function fetchDashboardSnapshot() {
  return invoke<DashboardSnapshot>("dashboard_snapshot");
}
