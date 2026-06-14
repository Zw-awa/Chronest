import { useMemo, useState } from "react";
import { cx } from "@lib";
import type { Language } from "./settings-types";
import { settingsI18n } from "./settings-i18n";
import githubIcon from "@assets/github.svg";

type SettingsView =
  | "root"
  | "language"
  | "data"
  | "plugins"
  | "about"
  | "github-confirm"
  | "clear-history-confirm";

type SettingsMenuProps = {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  onLanguageChange: (language: Language) => void;
};

const githubRepositoryUrl = "https://github.com/Zw-awa/Chronest";

export function SettingsMenu({
  isOpen,
  language,
  onClose,
  onLanguageChange
}: SettingsMenuProps) {
  const [view, setView] = useState<SettingsView>("root");
  const [dataStatus, setDataStatus] = useState<string>("");
  const [actionError, setActionError] = useState<string>("");
  const copy = settingsI18n[language];

  const title = useMemo(() => {
    switch (view) {
      case "language":
        return copy.languageTitle;
      case "data":
        return copy.dataTitle;
      case "plugins":
        return copy.pluginsTitle;
      case "about":
        return copy.aboutTitle;
      case "github-confirm":
        return copy.githubConfirmTitle;
      case "clear-history-confirm":
        return copy.clearHistoryConfirmTitle;
      default:
        return copy.settings;
    }
  }, [copy, view]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div
        className="settings-dialog"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="settings-dialog-header">
          <div className="settings-dialog-title-group">
            {view !== "root" ? (
              <button
                type="button"
                className="settings-back"
                onClick={() => {
                  if (view === "github-confirm") {
                    setView("about");
                    return;
                  }

                  if (view === "clear-history-confirm") {
                    setView("data");
                    return;
                  }

                  setView("root");
                }}
              >
                ←
              </button>
            ) : null}
            <strong className="settings-dialog-title">{title}</strong>
          </div>
          <button type="button" className="settings-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="settings-stack">
          <div
            className={cx(
              "settings-panel",
              view === "root" ? "is-active" : "is-hidden"
            )}
          >
            <MenuButton label={copy.language} onClick={() => setView("language")} />
            <MenuButton label={copy.data} onClick={() => setView("data")} />
            <MenuButton label={copy.plugins} onClick={() => setView("plugins")} />
            <MenuButton label={copy.about} onClick={() => setView("about")} />
          </div>

          <div
            className={cx(
              "settings-panel",
              view === "language" ? "is-active" : "is-hidden"
            )}
          >
            <MenuButton
              label={copy.chinese}
              active={language === "zh-CN"}
              onClick={() => onLanguageChange("zh-CN")}
            />
            <MenuButton
              label={copy.english}
              active={language === "en"}
              onClick={() => onLanguageChange("en")}
            />
          </div>

          <div
            className={cx(
              "settings-panel",
              view === "data" ? "is-active" : "is-hidden"
            )}
          >
            <MenuButton
              label={copy.chooseStorage}
              onClick={async () => {
                setActionError("");
                try {
                  const selectedPath = await chooseStorageLocation();
                  if (selectedPath) {
                    setDataStatus(`已保存到：${selectedPath}（重启后生效）`);
                    return;
                  }

                  setDataStatus("已取消选择数据存储位置");
                } catch (error) {
                  setActionError(formatActionError(error));
                }
              }}
            />
            <MenuButton
              label={copy.clearHistory}
              onClick={() => {
                setView("clear-history-confirm");
              }}
            />
            {dataStatus ? <div className="settings-inline-status">{dataStatus}</div> : null}
            {actionError ? <div className="settings-inline-error">{actionError}</div> : null}
          </div>

          <div
            className={cx(
              "settings-panel",
              view === "plugins" ? "is-active" : "is-hidden"
            )}
          >
            <div className="settings-note">
              <strong>{copy.pluginsComingSoonTitle}</strong>
              <span>{copy.pluginsComingSoonBody}</span>
            </div>
          </div>

          <div
            className={cx(
              "settings-panel",
              view === "about" ? "is-active" : "is-hidden"
            )}
          >
            <div className="settings-note settings-note-rich">
              <strong>{copy.aboutAuthor}</strong>
              <span>{copy.aboutDisclaimer}</span>
              <span>{copy.aboutOpenSource}</span>
              <span>{copy.aboutAntiScam}</span>
            </div>
            <button
              type="button"
              className="github-entry"
              onClick={() => {
                setView("github-confirm");
              }}
            >
              <img className="github-icon" aria-hidden="true" src={githubIcon} alt="" />
              <span>{copy.githubRepo}</span>
            </button>
          </div>

          <div
            className={cx(
              "settings-panel",
              view === "github-confirm" ? "is-active" : "is-hidden"
            )}
          >
            <div className="settings-confirm settings-confirm-panel">
              <img className="github-confirm-icon" aria-hidden="true" src={githubIcon} alt="" />
              <strong className="settings-confirm-title">{copy.githubConfirmTitle}</strong>
              <p className="settings-confirm-copy">{copy.githubConfirmBody}</p>
              <div className="settings-confirm-actions">
                <button
                  type="button"
                  className="settings-confirm-button"
                  onClick={() => {
                    setView("about");
                  }}
                >
                  {copy.cancel}
                </button>
                <button
                  type="button"
                  className="settings-confirm-button is-primary"
                  onClick={async () => {
                    setView("about");
                    setActionError("");
                    try {
                      await openRepositoryLink(githubRepositoryUrl);
                    } catch (error) {
                      setActionError(formatActionError(error));
                    }
                  }}
                >
                  {copy.continue}
                </button>
              </div>
            </div>
          </div>

          <div
            className={cx(
              "settings-panel",
              view === "clear-history-confirm" ? "is-active" : "is-hidden"
            )}
          >
            <div className="settings-confirm settings-confirm-panel">
              <strong className="settings-confirm-title">{copy.clearHistoryConfirmTitle}</strong>
              <p className="settings-confirm-copy">{copy.clearHistoryConfirmBody}</p>
              <div className="settings-confirm-actions">
                <button
                  type="button"
                  className="settings-confirm-button"
                  onClick={() => {
                    setView("data");
                  }}
                >
                  {copy.cancel}
                </button>
                <button
                  type="button"
                  className="settings-confirm-button is-danger"
                  onClick={async () => {
                    setActionError("");
                    try {
                      const clearedCount = await clearHistoryRecords();
                      setDataStatus(`已清空 ${clearedCount} 条历史记录`);
                    } catch (error) {
                      setActionError(formatActionError(error));
                    }
                    setView("data");
                  }}
                >
                  {copy.dangerConfirm}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuButton({
  label,
  onClick,
  active
}: {
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={cx("settings-menu-button", active ? "is-active" : "")}
      onClick={onClick}
    >
      <span>{label}</span>
      <span className="settings-menu-chevron">›</span>
    </button>
  );
}

async function openRepositoryLink(url: string) {
  if ("__TAURI_INTERNALS__" in window || "__TAURI__" in window) {
    const { invoke } = await import("@tauri-apps/api/core");
    await invoke("open_external_url", { url });
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}

async function clearHistoryRecords() {
  if (!("__TAURI_INTERNALS__" in window || "__TAURI__" in window)) {
    return 0;
  }

  const { invoke } = await import("@tauri-apps/api/core");
  return invoke<number>("clear_history_records");
}

async function chooseStorageLocation() {
  if (!("__TAURI_INTERNALS__" in window || "__TAURI__" in window)) {
    return null;
  }

  const { invoke } = await import("@tauri-apps/api/core");
  return invoke<string | null>("choose_storage_location");
}

function formatActionError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "操作失败，请重试";
}
