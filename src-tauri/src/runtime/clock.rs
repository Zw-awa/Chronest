use chrono::Local;

pub trait Clock: Send + Sync {
  fn today(&self) -> String;
}

pub struct LocalClock;

impl Clock for LocalClock {
  fn today(&self) -> String {
    Local::now().date_naive().to_string()
  }
}
