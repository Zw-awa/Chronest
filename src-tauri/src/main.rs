#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod app;
mod dashboard;
mod plugins;
mod runtime;
mod settings;
mod state;
mod tasks;

use tauri::Manager;
use tauri::webview::PageLoadEvent;
use app::build_app_state;
use dashboard::commands;

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      let state = build_app_state(app.handle())?;
      app.manage(state);
      Ok(())
    })
    .on_page_load(|webview, payload| {
      if payload.event() == PageLoadEvent::Finished {
        let window = webview.window();
        let _ = window.show();
        let _ = window.set_focus();
      }
    })
    .invoke_handler(tauri::generate_handler![
      commands::dashboard_snapshot,
      commands::list_plugins,
      commands::list_tasks,
      commands::open_external_url,
      commands::clear_history_records,
      commands::choose_storage_location
    ])
    .run(tauri::generate_context!())
    .expect("error while running Chronest");
}
