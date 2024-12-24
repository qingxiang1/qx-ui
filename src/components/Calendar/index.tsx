import { CSSProperties, ReactNode, useState } from "react";
import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";
import { useControllableValue } from "ahooks";

import MonthCalendar from "./MonthCalendar";
import Header from "./Header";
import styles from "./index.module.less";
import LocaleContext from "./LocaleContext";

export interface CalendarProps {
  value?: Dayjs;
  defaultValue?: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  // 定制日期显示，会完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode;
  // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  // 国际化相关
  locale?: string;
  onChange?: (date: Dayjs) => void;
}

function Calendar(props: CalendarProps) {
  const { value, style, className, locale, onChange } = props;

  const [curValue, setCurValue] = useControllableValue<Dayjs>(props, {
    defaultValue: dayjs(),
  });
  const [curMonth, setCurMonth] = useState<Dayjs>(curValue);

  const changeDate = (date: Dayjs) => {
    setCurValue(date);
    setCurMonth(date);
    onChange?.(date);
  };

  const selectHandler = (date: Dayjs) => {
    changeDate(date);
  };

  const prevMonthHandler = () => {
    setCurMonth(curMonth.subtract(1, "month"));
  };

  const nextMonthHandler = () => {
    setCurMonth(curMonth.add(1, "month"));
  };

  const todayHandler = () => {
    const date = dayjs(Date.now());

    changeDate(date);
  };

  return (
    <LocaleContext.Provider
      value={{
        locale: locale || navigator.language,
      }}
    >
      <div className={classNames(styles.calendar, className)} style={style}>
        <Header
          curMonth={curMonth}
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          todayHandler={todayHandler}
        />
        <MonthCalendar
          {...props}
          value={curValue}
          curMonth={curMonth}
          selectHandler={selectHandler}
        />
      </div>
    </LocaleContext.Provider>
  );
}

export default Calendar;
