import { memo } from "react";
import { motion } from "framer-motion";
import { type CalendarDay, isSameDay, isInRange, getHoliday } from "@/lib/calendar-utils";
import type { DateRange } from "@/hooks/useCalendar";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const cell = (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.008, duration: 0.2 }}
      onClick={() => onClick(date)}
      className={cn(
        "relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm font-sans transition-all duration-200 cursor-pointer select-none",
        "hover:bg-primary/10 hover:scale-110",
        !isCurrentMonth && "opacity-30",
        isCurrentMonth && "opacity-100",
        isWeekend && isCurrentMonth && "text-destructive font-medium",
        holiday && isCurrentMonth && "text-destructive font-semibold",
        isToday && "ring-2 ring-accent ring-offset-1 ring-offset-background font-bold",
        inRange && "bg-primary/10",
        isStart && "bg-primary text-primary-foreground rounded-r-none font-bold",
        isEnd && "bg-accent text-accent-foreground rounded-l-none font-bold",
        isStart && isEnd && "rounded-lg",
      )}
    >
      {/* Holiday indicator dot */}
      {holiday && isCurrentMonth && (
        <span className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-destructive" />
      )}
      <span className="relative z-10">{date.getDate()}</span>
    </motion.button>
  );

  if (holiday && isCurrentMonth) {
    return (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>{cell}</TooltipTrigger>
          <TooltipContent side="top" className="text-xs font-sans">
            {holiday}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return cell;
});

export default DayCell;
