import { useEffect } from "react";
import {
  initializeDesktopWindow,
  isDesktopRuntime,
  startWindowDrag
} from "./windowing-service";

export function useWindowDrag() {
  useEffect(() => {
    if (!isDesktopRuntime()) {
      return;
    }

    void initializeDesktopWindow().catch((error) => {
      console.error("Chronest desktop window initialization failed.", error);
    });

    return () => {
      // no-op cleanup for current desktop init path
    };
  }, []);

  return {
    async startDrag() {
      if (!isDesktopRuntime()) {
        return;
      }

      await startWindowDrag();
    }
  };
}
