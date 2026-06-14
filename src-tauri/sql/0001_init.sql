create table if not exists settings (
  key text primary key,
  value text not null
);

create table if not exists tasks (
  id integer primary key autoincrement,
  title text not null,
  calendar_date text not null,
  start_at text not null,
  working_dir text not null,
  command_text text not null,
  automation_kind text not null,
  git_add_target text,
  commit_template text,
  ai_provider text,
  ai_model text,
  enabled integer not null default 1,
  created_at text not null,
  updated_at text not null
);

create table if not exists task_runs (
  id integer primary key autoincrement,
  task_id integer not null references tasks(id) on delete cascade,
  status text not null,
  started_at text not null,
  finished_at text,
  output text
);

create index if not exists idx_tasks_calendar on tasks(calendar_date, start_at);
create index if not exists idx_task_runs_task on task_runs(task_id, started_at desc);

