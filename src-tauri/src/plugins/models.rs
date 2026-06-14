use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PluginManifest {
  pub id: String,
  pub name: String,
  pub version: String,
  pub kind: String,
  pub description: String,
  pub capabilities: Vec<String>,
  pub official: bool,
}
