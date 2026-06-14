import type { PluginManifest } from "./plugin-types";

export const samplePlugins: PluginManifest[] = [
  {
    id: "official-git",
    name: "Git Automation",
    version: "0.1.0",
    kind: "official",
    description:
      "Schedules add/commit flows and prepares the later AI commit message hook.",
    capabilities: ["git", "exec", "fs", "secrets"],
    official: true
  }
];
