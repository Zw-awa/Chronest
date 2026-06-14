use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TaskSummary {
  pub id: i64,
  pub title: String,
  pub calendar_date: String,
  pub start_at: String,
  pub working_dir: String,
  pub command_preview: String,
  pub automation_kind: String,
  pub status: String,
}
