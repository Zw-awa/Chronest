use std::{error::Error, fs, path::PathBuf};

use tauri::{AppHandle, Manager};
use crate::runtime::load_storage_config;

pub struct AppPaths {
  pub db_path: PathBuf,
  pub plugin_root: PathBuf,
  pub storage_config_path: PathBuf,
}

impl AppPaths {
  pub fn resolve(app: &AppHandle) -> Result<Self, Box<dyn Error>> {
    let default_data_dir = app.path().app_data_dir()?;
    fs::create_dir_all(&default_data_dir)?;
    let config_dir = app.path().app_config_dir()?;
    fs::create_dir_all(&config_dir)?;
    let storage_config_path = config_dir.join("storage.json");
    let storage_config = load_storage_config(&storage_config_path)?;
    let data_dir = storage_config.data_dir.unwrap_or(default_data_dir);
    fs::create_dir_all(&data_dir)?;

    let plugin_root = std::env::current_dir()?.join("plugins");
    fs::create_dir_all(&plugin_root)?;

    Ok(Self {
      db_path: data_dir.join("chronest.sqlite3"),
      plugin_root,
      storage_config_path,
    })
  }
}
