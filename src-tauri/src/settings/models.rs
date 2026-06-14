use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SchedulerOverview {
  pub runtime: String,
  pub worker_status: String,
  pub storage: String,
  pub secret_strategy: String,
  pub notes: Vec<String>,
}

impl SchedulerOverview {
  pub fn planned() -> Self {
    Self {
      runtime: "calendar-daemon".to_string(),
      worker_status: "planned".to_string(),
      storage: "sqlite".to_string(),
      secret_strategy: "metadata in SQLite, secrets in OS storage next".to_string(),
      notes: vec![
        "Clarify whether jobs must still run after the main window is fully closed.".to_string(),
        "Plugin permissions should be explicit for exec, fs, network, git, and secrets."
          .to_string(),
        "Git flows should support preview, retries, and empty-change guards before the first public release."
          .to_string(),
      ],
    }
  }
}
