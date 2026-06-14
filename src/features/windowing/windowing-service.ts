import { getCurrentWebview } from "@tauri-apps/api/webview";
import { getCurrentWindow } from "@tauri-apps/api/window";

declare global {
  interface Window {
    __TAURI__?: unknown;
    __TAURI_INTERNALS__?: unknown;
  }
}

export function isDesktopRuntime() {
  return "__TAURI_INTERNALS__" in window || "__TAURI__" in window;
}

export async function initializeDesktopWindow() {
  const currentWindow = getCurrentWindow();
  const currentWebview = getCurrentWebview();

  await currentWindow.clearEffects();
  await currentWebview.setFocus();
}

export async function startWindowDrag() {
  await getCurrentWindow().startDragging();
}
