import { useEffect, useState } from "react";
import { sampleDashboard } from "./dashboard-sample";
import type { DashboardSnapshot, Language } from "./dashboard-types";
import { isDesktopRuntime } from "@features/windowing";
import { fetchDashboardSnapshot } from "@services";

type DashboardState = {
  snapshot: DashboardSnapshot;
  language: Language;
  isLive: boolean;
};

export function useDashboard() {
  const [state, setState] = useState<DashboardState>({
    snapshot: sampleDashboard,
    language: "zh-CN",
    isLive: false
  });

  useEffect(() => {
    let cancelled = false;

    async function loadSnapshot() {
      if (!isDesktopRuntime()) {
        return;
      }

      try {
        const snapshot = await fetchDashboardSnapshot();

        if (!cancelled) {
          setState((current) => ({
            ...current,
            snapshot,
            isLive: true
          }));
        }
      } catch (error) {
        console.error("Chronest bootstrap fell back to local sample data.", error);
      }
    }

    void loadSnapshot();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    ...state,
    setLanguage(language: Language) {
      setState((current) => ({
        ...current,
        language
      }));
    }
  };
}
