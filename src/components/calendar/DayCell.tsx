import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { type CalendarDay, isSameDay, isInRange, getHoliday } from "@/lib/calendar-utils";
import type { DateRange } from "@/hooks/useCalendar";
import { cn } from "@/lib/utils";

interface DayCellProps {
  day: CalendarDay;
  range: DateRange;
  onClick: (date: Date) => void;
  index: number;
}

const DayCell = memo(function DayCell({ day, range, onClick, index }: DayCellProps) {
  const { date, isCurrentMonth, isToday, isWeekend } = day;

  const isStart = range.start ? isSameDay(date, range.start) : false;
  const isEnd = range.end ? isSameDay(date, range.end) : false;
  const inRange = isInRange(date, range.start, range.end) && !isStart && !isEnd;
  const holiday = isCurrentMonth ? getHoliday(date.getMonth(), date.getDate()) : undefined;
  const hasNote = false; // Could extend

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.008, duration: 0.2 }}
      onClick={() => onClick(date)}
      title={holiday || undefined}
      className={cn(
        "relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm font-sans transition-all duration-200 cursor-pointer select-none",
        "hover:bg-primary/10 hover:scale-110",
        !isCurrentMonth && "opacity-30",
        isCurrentMonth && "opacity-100",
        isWeekend && isCurrentMonth && "text-calendar-weekend font-medium",
        isToday && "ring-2 ring-calendar-today ring-offset-1 ring-offset-calendar-paper font-bold",
        inRange && "bg-calendar-range",
        isStart && "bg-calendar-start text-primary-foreground rounded-r-none font-bold",
        isEnd && "bg-calendar-end text-accent-foreground rounded-l-none font-bold",
        isStart && isEnd && "rounded-lg",
      )}
    >
      <span className="relative z-10">{date.getDate()}</span>
      {holiday && (
        <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-calendar-today" />
      )}
    </motion.button>
  );
});

export default DayCell;
