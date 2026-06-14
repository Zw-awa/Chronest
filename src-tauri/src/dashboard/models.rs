use serde::{Deserialize, Serialize};

use crate::{
  plugins::PluginManifest,
  settings::SchedulerOverview,
  tasks::TaskSummary,
};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DashboardSnapshot {
  pub today: String,
  pub focus_date: String,
  pub scheduler: SchedulerOverview,
  pub tasks: Vec<TaskSummary>,
  pub plugins: Vec<PluginManifest>,
}
