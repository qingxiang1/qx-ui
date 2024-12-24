import { useContext } from "react";
import { Dayjs } from "dayjs";

import styles from "./index.module.less";
import LocaleContext from "./LocaleContext";
import allLocales from "./locale";

interface HeaderProps {
  curMonth: Dayjs;
  prevMonthHandler: () => void;
  nextMonthHandler: () => void;
  todayHandler: () => void;
}

function Header(props: HeaderProps) {
  const { curMonth, prevMonthHandler, nextMonthHandler, todayHandler } = props;

  const localeContext = useContext(LocaleContext);
  const CalendarContext = allLocales[localeContext.locale];

  return (
    <div className={styles["calendar-header"]}>
      <div className={styles["calendar-header-left"]}>
        <div
          className={styles["calendar-header-icon"]}
          onClick={prevMonthHandler}
        >
          &lt;
        </div>
        <div className={styles["calendar-header-value"]}>
          {curMonth.format(CalendarContext.formatMonth)}
        </div>
        <div
          className={styles["calendar-header-icon"]}
          onClick={nextMonthHandler}
        >
          &gt;
        </div>
        <button
          className={styles["calendar-header-btn"]}
          onClick={todayHandler}
        >
          {CalendarContext.today}
        </button>
      </div>
    </div>
  );
}

export default Header;
