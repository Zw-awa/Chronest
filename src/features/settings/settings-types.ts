export type Language = "zh-CN" | "en";

export type SchedulerOverview = {
  runtime: string;
  workerStatus: string;
  storage: string;
  secretStrategy: string;
  notes: string[];
};
