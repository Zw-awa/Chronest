use tauri::State;
use std::{fs, path::PathBuf, process::Command};

use crate::{
  dashboard::DashboardSnapshot,
  plugins::PluginManifest,
  runtime::{StorageConfig, save_storage_config},
  state::AppState,
  tasks::{TaskSummary, clear_history}
};

#[tauri::command]
pub fn dashboard_snapshot(state: State<'_, AppState>) -> Result<DashboardSnapshot, String> {
  state.dashboard.snapshot().map_err(stringify_error)
}

#[tauri::command]
pub fn list_tasks(state: State<'_, AppState>) -> Result<Vec<TaskSummary>, String> {
  state.dashboard.list_tasks().map_err(stringify_error)
}

#[tauri::command]
pub fn list_plugins(state: State<'_, AppState>) -> Result<Vec<PluginManifest>, String> {
  state.dashboard.list_plugins().map_err(stringify_error)
}

#[tauri::command]
pub fn open_external_url(url: String) -> Result<(), String> {
  #[cfg(target_os = "windows")]
  {
    Command::new("cmd")
      .args(["/C", "start", "", &url])
      .spawn()
      .map_err(|error| error.to_string())?;
  }

  #[cfg(target_os = "macos")]
  {
    Command::new("open")
      .arg(&url)
      .spawn()
      .map_err(|error| error.to_string())?;
  }

  #[cfg(all(unix, not(target_os = "macos")))]
  {
    Command::new("xdg-open")
      .arg(&url)
      .spawn()
      .map_err(|error| error.to_string())?;
  }

  Ok(())
}

#[tauri::command]
pub fn clear_history_records(state: State<'_, AppState>) -> Result<usize, String> {
  clear_history(&state.db_path).map_err(stringify_error)
}

#[tauri::command]
pub fn choose_storage_location(state: State<'_, AppState>) -> Result<Option<String>, String> {
  let selected_path = select_directory_via_powershell().map_err(boxed_error_to_string)?;

  let Some(selected_path) = selected_path else {
    return Ok(None);
  };

  let selected_dir = PathBuf::from(selected_path.trim());
  fs::create_dir_all(&selected_dir).map_err(stringify_error)?;

  let target_db_path = selected_dir.join("chronest.sqlite3");
  if state.db_path.exists() && state.db_path != target_db_path {
    fs::copy(&state.db_path, &target_db_path).map_err(stringify_error)?;
  }

  let config = StorageConfig {
    data_dir: Some(selected_dir.clone())
  };
  save_storage_config(&state.storage_config_path, &config).map_err(boxed_error_to_string)?;

  Ok(Some(selected_dir.display().to_string()))
}

fn stringify_error(error: impl std::error::Error) -> String {
  error.to_string()
}

fn boxed_error_to_string(error: Box<dyn std::error::Error>) -> String {
  error.to_string()
}

fn select_directory_via_powershell() -> Result<Option<String>, Box<dyn std::error::Error>> {
  let script = r#"
Add-Type -AssemblyName System.Windows.Forms
$dialog = New-Object System.Windows.Forms.FolderBrowserDialog
$dialog.Description = 'Select Chronest data storage folder'
$dialog.UseDescriptionForTitle = $true
if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
  [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
  Write-Output $dialog.SelectedPath
}
"#;

  let output = Command::new("powershell.exe")
    .args(["-NoProfile", "-Sta", "-Command", script])
    .output()?;

  if !output.status.success() {
    let stderr = String::from_utf8_lossy(&output.stderr).trim().to_string();
    return Err(stderr.into());
  }

  let stdout = String::from_utf8_lossy(&output.stdout).trim().to_string();
  if stdout.is_empty() {
    return Ok(None);
  }

  Ok(Some(stdout))
}
