use std::{
  error::Error,
  fmt::{Display, Formatter},
};

pub type AppResult<T> = Result<T, AppError>;

#[derive(Debug, Clone)]
pub struct AppError {
  message: String,
}

impl AppError {
  pub fn new(message: impl Into<String>) -> Self {
    Self {
      message: message.into(),
    }
  }
}

impl Display for AppError {
  fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
    f.write_str(&self.message)
  }
}

impl Error for AppError {}

impl From<String> for AppError {
  fn from(message: String) -> Self {
    Self::new(message)
  }
}

impl From<&str> for AppError {
  fn from(message: &str) -> Self {
    Self::new(message)
  }
}

impl From<rusqlite::Error> for AppError {
  fn from(error: rusqlite::Error) -> Self {
    Self::new(error.to_string())
  }
}

impl From<std::io::Error> for AppError {
  fn from(error: std::io::Error) -> Self {
    Self::new(error.to_string())
  }
}

impl From<serde_json::Error> for AppError {
  fn from(error: serde_json::Error) -> Self {
    Self::new(error.to_string())
  }
}
