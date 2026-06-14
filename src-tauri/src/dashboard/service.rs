use std::sync::Arc;

use crate::{
  dashboard::DashboardSnapshot,
  plugins::{PluginManifest, PluginReader},
  runtime::{AppResult, Clock},
  settings::SchedulerOverview,
  tasks::{TaskReader, TaskSummary},
};

#[derive(Clone)]
pub struct DashboardService {
  task_reader: Arc<dyn TaskReader>,
  plugin_reader: Arc<dyn PluginReader>,
  clock: Arc<dyn Clock>,
  scheduler: SchedulerOverview,
}

impl DashboardService {
  pub fn new(
    task_reader: Arc<dyn TaskReader>,
    plugin_reader: Arc<dyn PluginReader>,
    clock: Arc<dyn Clock>,
    scheduler: SchedulerOverview,
  ) -> Self {
    Self {
      task_reader,
      plugin_reader,
      clock,
      scheduler,
    }
  }

  pub fn snapshot(&self) -> AppResult<DashboardSnapshot> {
    let tasks = self.list_tasks()?;
    let plugins = self.list_plugins()?;
    let today = self.clock.today();
    let focus_date = tasks
      .first()
      .map(|task| task.calendar_date.clone())
      .unwrap_or_else(|| today.clone());

    Ok(DashboardSnapshot {
      today,
      focus_date,
      scheduler: self.scheduler.clone(),
      tasks,
      plugins,
    })
  }

  pub fn list_tasks(&self) -> AppResult<Vec<TaskSummary>> {
    self.task_reader.list_tasks()
  }

  pub fn list_plugins(&self) -> AppResult<Vec<PluginManifest>> {
    self.plugin_reader.list_plugins()
  }
}
