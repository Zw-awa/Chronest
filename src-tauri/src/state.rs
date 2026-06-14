use std::path::PathBuf;

use crate::dashboard::DashboardService;

pub struct AppState {
  pub dashboard: DashboardService,
  pub db_path: PathBuf,
  pub storage_config_path: PathBuf,
}
