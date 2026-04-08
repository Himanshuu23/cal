import { memo, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DAY_NAMES, generateCalendarGrid } from "@/lib/calendar-utils";
import type { DateRange } from "@/hooks/useCalendar";
import DayCell from "./DayCell";

interface CalendarGridProps {
  year: number;
  month: number;
  range: DateRange;
  onDayClick: (date: Date) => void;
  onPrev: () => void;
  onNext: () => void;
}

const CalendarGrid = memo(function CalendarGrid({
  year, month, range, onDayClick, onPrev, onNext,
}: CalendarGridProps) {
  const days = useMemo(() => generateCalendarGrid(year, month), [year, month]);

  return (
    <div className="p-4 sm:p-6 calendar-paper">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPrev}
          className="p-2 rounded-full hover:bg-primary/10 transition-colors text-foreground"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="p-2 rounded-full hover:bg-primary/10 transition-colors text-foreground"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-sans font-semibold tracking-wider uppercase text-muted-foreground py-1"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day, i) => (
          <DayCell
            key={day.date.toISOString()}
            day={day}
            range={range}
            onClick={onDayClick}
            index={i}
          />
        ))}
      </div>
    </div>
  );
});

export default CalendarGrid;
