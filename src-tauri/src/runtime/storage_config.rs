use std::{
  error::Error,
  fs,
  path::{Path, PathBuf},
};

use serde::{Deserialize, Serialize};

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct StorageConfig {
  pub data_dir: Option<PathBuf>,
}

pub fn load_storage_config(config_path: &Path) -> Result<StorageConfig, Box<dyn Error>> {
  if !config_path.exists() {
    return Ok(StorageConfig::default());
  }

  let content = fs::read_to_string(config_path)?;
  let config = serde_json::from_str::<StorageConfig>(&content)?;
  Ok(config)
}

pub fn save_storage_config(config_path: &Path, config: &StorageConfig) -> Result<(), Box<dyn Error>> {
  if let Some(parent) = config_path.parent() {
    fs::create_dir_all(parent)?;
  }

  let content = serde_json::to_string_pretty(config)?;
  fs::write(config_path, content)?;
  Ok(())
}
