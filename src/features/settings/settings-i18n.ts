import zhCN from "../../locales/settings.zh-CN.json";
import en from "../../locales/settings.en.json";
import type { Language } from "./settings-types";

export const settingsI18n = {
  "zh-CN": zhCN,
  en
} satisfies Record<Language, typeof zhCN>;
