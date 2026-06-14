use std::{fs, path::PathBuf};

use crate::{plugins::PluginManifest, runtime::AppResult};

pub trait PluginReader: Send + Sync {
  fn list_plugins(&self) -> AppResult<Vec<PluginManifest>>;
}

pub struct FilesystemPluginRepository {
  plugin_root: PathBuf,
}

impl FilesystemPluginRepository {
  pub fn new(plugin_root: PathBuf) -> Self {
    Self { plugin_root }
  }
}

impl PluginReader for FilesystemPluginRepository {
  fn list_plugins(&self) -> AppResult<Vec<PluginManifest>> {
    let mut manifests = Vec::new();

    if !self.plugin_root.exists() {
      return Ok(manifests);
    }

    for entry in fs::read_dir(&self.plugin_root)? {
      let entry = entry?;

      if !entry.file_type()?.is_dir() {
        continue;
      }

      let manifest_path = entry.path().join("manifest.json");

      if !manifest_path.exists() {
        continue;
      }

      let manifest_text = fs::read_to_string(manifest_path)?;
      let manifest = serde_json::from_str::<PluginManifest>(&manifest_text)?;
      manifests.push(manifest);
    }

    manifests.sort_by(|left, right| left.name.cmp(&right.name));
    Ok(manifests)
  }
}
