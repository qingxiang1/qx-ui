import { useContext } from "react";
import { Dayjs } from "dayjs";
import classNames from "classnames";

import styles from "./index.module.less";
import { CalendarProps } from "./index";
import LocaleContext from "./LocaleContext";
import allLocales from "./locale";

interface MonthCalendarProps extends CalendarProps {
  selectHandler?: (date: Dayjs) => void;
  curMonth: Dayjs;
}

function getAllDays(date: Dayjs) {
  const daysInMonth = date.daysInMonth();
  const startDate = date.startOf("month");
  const day = startDate.day();

  const daysInfo: Array<{ date: Dayjs; currentMonth: boolean }> = new Array(
    6 * 7
  );

  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, "day"),
      currentMonth: false,
    };
  }

  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, "day");
    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month(),
    };
  }

  return daysInfo;
}

function MonthCalendar(props: MonthCalendarProps) {
  const localeContext = useContext(LocaleContext);

  const {
    value,
    curMonth,
    dateRender,
    dateInnerContent,
    selectHandler,
  } = props;
  const CalendarLocale = allLocales[localeContext.locale];

  const weekList = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  function renderDays(days: Array<{ date: Dayjs; currentMonth: boolean }>) {
    const rows = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        const item = days[i * 7 + j];
        const classes = item.currentMonth
          ? styles["calendar-month-body-cell-current"]
          : "";
        row[j] = (
          <div
            className={classNames(styles["calendar-month-body-cell"], classes)}
            onClick={() => selectHandler?.(item.date)}
          >
            {dateRender ? (
              dateRender(item.date)
            ) : (
              <div className={styles["calendar-month-body-cell-date"]}>
                <div
                  className={classNames(
                    styles["calendar-month-body-cell-date-value"],
                    value?.format("YYYY-MM-DD") ===
                      item.date.format("YYYY-MM-DD")
                      ? styles["calendar-month-body-cell-date-selected"]
                      : ""
                  )}
                >
                  {item.date.date()}
                </div>
                <div
                  className={styles["calendar-month-body-cell-date-content"]}
                >
                  {dateInnerContent?.(item.date)}
                </div>
              </div>
            )}
          </div>
        );
      }
      rows.push(row);
    }
    return rows.map((row) => (
      <div className={styles["calendar-month-body-row"]}>{row}</div>
    ));
  }

  const allDays = getAllDays(curMonth);

  return (
    <div className={styles["calendar-month"]}>
      <div className={styles["calendar-month-week-list"]}>
        {weekList.map((week) => (
          <div className={styles["calendar-month-week-list-item"]} key={week}>
            {CalendarLocale.week[week]}
          </div>
        ))}
      </div>
      <div className={styles["calendar-month-body"]}>{renderDays(allDays)}</div>
    </div>
  );
}

export default MonthCalendar;
