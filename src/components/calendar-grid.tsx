import { zhCN } from "react-day-picker/locale";
import { DayPicker, type DayButtonProps } from "react-day-picker";
import { Solar } from "lunar-javascript";
import type { Language, TaskSummary } from "@features/dashboard";
import { cx } from "@lib";

type CalendarGridProps = {
  focusDate: string;
  today: string;
  tasks: TaskSummary[];
  language: Language;
  selectedDate: string;
  onSelectDate: (isoDate: string) => void;
};

export function CalendarGrid({
  focusDate,
  today,
  tasks,
  language,
  selectedDate,
  onSelectDate
}: CalendarGridProps) {
  const [yearText, monthText] = focusDate.split("-");
  const year = Number.parseInt(yearText, 10);
  const month = Number.parseInt(monthText, 10) - 1;
  const displayMonth = new Date(year, month, 1);
  const locale = language === "zh-CN" ? zhCN : undefined;
  const taskIndex = new Set(tasks.map((task) => task.calendarDate));

  return (
    <DayPicker
      mode="single"
      month={displayMonth}
      locale={locale}
      showOutsideDays
      fixedWeeks
      weekStartsOn={1}
      today={new Date(`${today}T00:00:00`)}
      className="calendar-shell minimal-calendar"
      formatters={{
        formatCaption: () => "",
        formatWeekdayName: (date) =>
          language === "zh-CN"
            ? ["日", "一", "二", "三", "四", "五", "六"][date.getDay()]
            : new Intl.DateTimeFormat("en", { weekday: "short" }).format(date),
        formatDay: (date) => `${date.getDate()}`
      }}
      classNames={{
        root: "calendar-shell minimal-calendar",
        months: "calendar-months",
        month: "calendar-month",
        month_caption: "calendar-heading minimal-heading",
        month_grid: "calendar-table",
        weekdays: "weekday-row",
        weekday: "weekday-cell",
        weeks: "calendar-weeks",
        week: "calendar-week",
        day: "calendar-day-cell",
        outside: "is-outside",
        today: "is-today",
        selected: "is-selected"
      }}
      components={{
        DayButton: (props) => (
          <LunarDayButton
            {...props}
            today={today}
            taskIndex={taskIndex}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
          />
        )
      }}
      selected={new Date(`${selectedDate}T00:00:00`)}
      onSelect={(date: Date | undefined) => {
        if (!date) {
          return;
        }

        onSelectDate(toIsoDate(date));
      }}
    />
  );
}

function LunarDayButton(
  props: DayButtonProps & {
    today: string;
    taskIndex: Set<string>;
    selectedDate: string;
    onSelectDate: (isoDate: string) => void;
  }
) {
  const { day, className, today, taskIndex, selectedDate, onSelectDate, ...rest } = props;
  const date = day.date;
  const isoDate = toIsoDate(date);
  const lunarMeta = getLunarMeta(date);
  const isToday = isoDate === today;
  const isSelected = isoDate === selectedDate;
  const hasTask = taskIndex.has(isoDate);
  const isFestival = lunarMeta.isFestival;

  return (
    <button
      {...rest}
      className={cx(
        "calendar-cell",
        className,
        day.outside ? "is-outside" : "",
        isToday ? "is-today" : "",
        isSelected ? "is-selected" : "",
        hasTask ? "has-task" : "",
        isFestival ? "is-festival" : ""
      )}
      type="button"
      onClick={(event) => {
        rest.onClick?.(event);
        onSelectDate(isoDate);
      }}
    >
      <span className="calendar-number">{date.getDate()}</span>
      <span className="calendar-meta">{lunarMeta.label}</span>
    </button>
  );
}

function getLunarMeta(date: Date) {
  const solar = Solar.fromYmd(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const lunar = solar.getLunar();
  const festivals = lunar.getFestivals();
  const otherFestivals = lunar.getOtherFestivals();
  const jieQi = lunar.getJieQi();

  const label =
    festivals[0] ||
    otherFestivals[0] ||
    jieQi ||
    (lunar.getDay() === 1 ? `${lunar.getMonthInChinese()}月` : lunar.getDayInChinese());

  return {
    label,
    isFestival: Boolean(festivals[0] || otherFestivals[0] || jieQi)
  };
}

function toIsoDate(date: Date) {
  return [
    date.getFullYear(),
    `${date.getMonth() + 1}`.padStart(2, "0"),
    `${date.getDate()}`.padStart(2, "0")
  ].join("-");
}
