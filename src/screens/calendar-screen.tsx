import type { MouseEvent } from "react";
import { useMemo, useState } from "react";
import { CalendarGrid } from "@components/calendar-grid";
import { dashboardCopy } from "@features/dashboard";
import { useDashboard, useDesktopWindow } from "@features/dashboard";
import { SettingsMenu } from "@features/settings";
import { Solar } from "lunar-javascript";

export function CalendarScreen() {
  const { snapshot, language, isLive, setLanguage } = useDashboard();
  const { startDrag } = useDesktopWindow();
  const text = dashboardCopy[language];
  const [focusedMonth, setFocusedMonth] = useState(snapshot.focusDate);
  const [selectedDate, setSelectedDate] = useState(snapshot.today);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const headerLunar = useMemo(
    () => formatHeaderLunar(language, selectedDate),
    [language, selectedDate]
  );

  function handleTopbarMouseDown(event: MouseEvent<HTMLElement>) {
    if (event.button !== 0) {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest("button")) {
      return;
    }

    event.preventDefault();

    void startDrag().catch((error) => {
      console.error("Chronest drag start failed.", error);
    });
  }

  return (
    <main className="shell shell-minimal widget-shell">
      <header className="topbar">
        <div className="topbar-dragger" onMouseDownCapture={handleTopbarMouseDown}>
          <div className="topbar-copy">
            <strong className="topbar-date">{formatHeaderDate(selectedDate, language)}</strong>
            <span className="topbar-lunar">{headerLunar}</span>
          </div>
        </div>

        <div className="topbar-actions no-drag">
          <button
            type="button"
            className="settings-gear"
            aria-label={text.settings}
            onClick={() => {
              setSettingsOpen(true);
            }}
          >
            ⚙
          </button>
        </div>
      </header>

      <section className="calendar-stage widget-stage">
        <div className="surface-header">
          <div className="month-heading">
            <strong className="month-title">{formatMonthTitle(focusedMonth, language)}</strong>
          </div>
          <div className="calendar-nav">
            <button
              type="button"
              className="calendar-nav-button"
              aria-label="Previous month"
              onClick={() => {
                setFocusedMonth(shiftMonth(focusedMonth, -1));
              }}
            >
              ‹
            </button>
              <button
                type="button"
                className="calendar-today-button"
                onClick={() => {
                  setFocusedMonth(snapshot.today.slice(0, 7));
                  setSelectedDate(snapshot.today);
                }}
              >
                {text.todayButton}
              </button>
            <button
              type="button"
              className="calendar-nav-button"
              aria-label="Next month"
              onClick={() => {
                setFocusedMonth(shiftMonth(focusedMonth, 1));
              }}
            >
              ›
            </button>
          </div>
        </div>

        <CalendarGrid
          focusDate={focusedMonth}
          today={snapshot.today}
          tasks={snapshot.tasks}
          language={language}
          selectedDate={selectedDate}
          onSelectDate={(isoDate) => {
            setSelectedDate(isoDate);
          }}
        />
      </section>

      <SettingsMenu
        isOpen={settingsOpen}
        language={language}
        onClose={() => {
          setSettingsOpen(false);
        }}
        onLanguageChange={(nextLanguage) => {
          setLanguage(nextLanguage);
        }}
      />
    </main>
  );
}

function formatMonthTitle(focusDate: string, language: "zh-CN" | "en") {
  return new Intl.DateTimeFormat(language === "zh-CN" ? "zh-CN" : "en", {
    year: "numeric",
    month: "long"
  }).format(new Date(`${focusDate}T00:00:00`));
}

function formatHeaderDate(today: string, language: "zh-CN" | "en") {
  return new Intl.DateTimeFormat(language === "zh-CN" ? "zh-CN" : "en", {
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(new Date(`${today}T00:00:00`));
}

function formatHeaderLunar(language: "zh-CN" | "en", isoDate: string) {
  if (language !== "zh-CN") {
    return isoDate;
  }

  const [year, month, day] = isoDate.split("-").map((value) => Number.parseInt(value, 10));
  const lunar = Solar.fromYmd(year, month, day).getLunar();
  return `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;
}

function shiftMonth(focusDate: string, delta: number) {
  const [yearText, monthText] = focusDate.split("-");
  const baseDate = new Date(Number.parseInt(yearText, 10), Number.parseInt(monthText, 10) - 1, 1);
  baseDate.setMonth(baseDate.getMonth() + delta);
  return [
    baseDate.getFullYear(),
    `${baseDate.getMonth() + 1}`.padStart(2, "0")
  ].join("-");
}
