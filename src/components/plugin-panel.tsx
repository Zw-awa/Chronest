import { Button, Card, Pill } from "@components/ui";
import type { PluginManifest } from "@features/plugins";

type PluginPanelProps = {
  plugins: PluginManifest[];
};

export function PluginPanel({ plugins }: PluginPanelProps) {
  return (
    <div className="plugin-grid">
      {plugins.map((plugin) => (
        <Card key={plugin.id} className="plugin-card">
          <div className="plugin-card-top">
            <div>
              <span className="label">{plugin.kind}</span>
              <h3>{plugin.name}</h3>
            </div>
            <span className="badge">v{plugin.version}</span>
          </div>

          <p>{plugin.description}</p>

          <div className="pill-row">
            {plugin.capabilities.map((capability) => (
              <Pill key={capability}>
                {capability}
              </Pill>
            ))}
          </div>

          <div className="plugin-actions">
            <Button size="sm">
              Manifest
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
