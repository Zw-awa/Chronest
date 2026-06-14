use std::{error::Error, sync::Arc};

use tauri::AppHandle;

use crate::{
  dashboard::DashboardService,
  plugins::FilesystemPluginRepository,
  runtime::{AppPaths, LocalClock},
  settings::SchedulerOverview,
  state::AppState,
  tasks::{SqliteTaskRepository, initialize_database},
};

pub fn build_app_state(app: &AppHandle) -> Result<AppState, Box<dyn Error>> {
  let paths = AppPaths::resolve(app)?;
  initialize_database(&paths.db_path).map_err(boxed_error)?;
  let db_path = paths.db_path.clone();
  let plugin_root = paths.plugin_root.clone();
  let storage_config_path = paths.storage_config_path.clone();

  let dashboard = DashboardService::new(
    Arc::new(SqliteTaskRepository::new(db_path.clone())),
    Arc::new(FilesystemPluginRepository::new(plugin_root)),
    Arc::new(LocalClock),
    SchedulerOverview::planned(),
  );

  Ok(AppState {
    dashboard,
    db_path,
    storage_config_path
  })
}

fn boxed_error<E>(error: E) -> Box<dyn Error>
where
  E: Error + 'static,
{
  Box::new(error)
}
