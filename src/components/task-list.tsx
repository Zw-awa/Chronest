import { Button, Card, Pill } from "@components/ui";
import type { TaskSummary } from "@features/tasks";

type TaskListProps = {
  tasks: TaskSummary[];
};

function formatTaskDate(dateText: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(dateText));
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Card key={task.id} className="task-card">
          <div className="task-card-top">
            <div>
              <span className="label">{task.automationKind}</span>
              <h3>{task.title}</h3>
            </div>
            <Pill tone={task.status === "enabled" ? "success" : "muted"}>{task.status}</Pill>
          </div>

          <div className="task-meta">
            <span>{formatTaskDate(task.startAt)}</span>
            <span>{task.workingDir}</span>
          </div>

          <code className="command-preview">{task.commandPreview}</code>
          <div className="task-actions">
            <Button size="sm">
              Inspect
            </Button>
            <Button size="sm" variant="primary">
              Open
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
