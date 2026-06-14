export type PluginManifest = {
  id: string;
  name: string;
  version: string;
  kind: string;
  description: string;
  capabilities: string[];
  official: boolean;
};
