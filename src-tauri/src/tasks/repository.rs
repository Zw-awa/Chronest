use std::path::{Path, PathBuf};

use rusqlite::{Connection, params};

use crate::{runtime::AppResult, tasks::TaskSummary};

pub trait TaskReader: Send + Sync {
  fn list_tasks(&self) -> AppResult<Vec<TaskSummary>>;
}

pub fn initialize_database(db_path: &Path) -> AppResult<()> {
  let connection = Connection::open(db_path)?;
  connection.execute_batch(include_str!("../../sql/0001_init.sql"))?;
  seed_demo_data(&connection)?;
  Ok(())
}

pub fn clear_history(db_path: &Path) -> AppResult<usize> {
  let connection = Connection::open(db_path)?;
  let count = connection.execute("delete from task_runs", [])?;
  Ok(count)
}

pub struct SqliteTaskRepository {
  db_path: PathBuf,
}

impl SqliteTaskRepository {
  pub fn new(db_path: PathBuf) -> Self {
    Self { db_path }
  }
}

impl TaskReader for SqliteTaskRepository {
  fn list_tasks(&self) -> AppResult<Vec<TaskSummary>> {
    let connection = Connection::open(&self.db_path)?;
    let mut statement = connection.prepare(
      r#"
        select
          id,
          title,
          calendar_date,
          start_at,
          working_dir,
          command_text,
          automation_kind,
          enabled
        from tasks
        order by calendar_date asc, start_at asc
      "#,
    )?;

    let rows = statement.query_map([], |row| {
      let enabled_flag: i64 = row.get(7)?;

      Ok(TaskSummary {
        id: row.get(0)?,
        title: row.get(1)?,
        calendar_date: row.get(2)?,
        start_at: row.get(3)?,
        working_dir: row.get(4)?,
        command_preview: row.get(5)?,
        automation_kind: row.get(6)?,
        status: if enabled_flag == 1 {
          "enabled".to_string()
        } else {
          "paused".to_string()
        },
      })
    })?;

    let tasks = rows.collect::<Result<Vec<_>, _>>()?;
    Ok(tasks)
  }
}

fn seed_demo_data(connection: &Connection) -> AppResult<()> {
  let count: i64 = connection.query_row("select count(*) from tasks", [], |row| row.get(0))?;

  if count > 0 {
    return Ok(());
  }

  let now = "2026-06-13T18:10:00".to_string();
  let demo_rows = [
    (
      "Morning repo snapshot",
      "2026-06-15",
      "2026-06-15T09:30:00",
      "E:/game-projects/github-projects/Chronest",
      "git add . && git commit -m \"docs: seed Chronest skeleton\"",
      "official-git",
      Some("."),
      Some("docs: seed Chronest skeleton"),
      Some("openai"),
      Some("gpt-5"),
      1_i64,
    ),
    (
      "Launch local exporter",
      "2026-06-18",
      "2026-06-18T20:00:00",
      "E:/tools/exporter",
      "cargo run --release -- export nightly-report",
      "shell",
      None,
      None,
      None,
      None,
      1_i64,
    ),
    (
      "Draft AI-assisted release note",
      "2026-06-22",
      "2026-06-22T14:15:30",
      "E:/game-projects/github-projects/Chronest",
      "plugin://official-git/generate-commit-message",
      "official-git",
      Some("."),
      Some("chore: {summary}"),
      Some("openai"),
      Some("gpt-5"),
      0_i64,
    ),
  ];

  for row in demo_rows {
    connection.execute(
      r#"
        insert into tasks (
          title,
          calendar_date,
          start_at,
          working_dir,
          command_text,
          automation_kind,
          git_add_target,
          commit_template,
          ai_provider,
          ai_model,
          enabled,
          created_at,
          updated_at
        ) values (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?12)
      "#,
      params![
        row.0, row.1, row.2, row.3, row.4, row.5, row.6, row.7, row.8, row.9, row.10, now
      ],
    )?;
  }

  connection.execute(
    "insert or replace into settings (key, value) values (?1, ?2)",
    params!["theme", "graphite-brass"],
  )?;

  Ok(())
}
