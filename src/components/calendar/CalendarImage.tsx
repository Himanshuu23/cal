import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MONTH_NAMES } from "@/lib/calendar-utils";
import { getMonthImage } from "@/lib/month-images";

interface CalendarImageProps {
  month: number;
  year: number;
  isFlipping: boolean;
}

const CalendarImage = memo(function CalendarImage({ month, year, isFlipping }: CalendarImageProps) {
  const image = getMonthImage(month);
  const key = `${year}-${month}`;

  return (
    <div className="relative overflow-hidden rounded-t-lg" style={{ perspective: "1200px" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: "bottom center" }}
          className="relative"
        >
          <img
            src={image}
            alt={`${MONTH_NAMES[month]} ${year}`}
            className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
            width={1024}
            height={768}
          />
          {/* Month overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 right-6 text-right">
            <p className="text-primary-foreground/80 text-sm font-sans font-medium tracking-widest uppercase">
              {year}
            </p>
            <h2 className="text-primary-foreground text-3xl sm:text-4xl font-display font-bold">
              {MONTH_NAMES[month]}
            </h2>
          </div>
          {/* Month number */}
          <div className="absolute top-4 right-6">
            <span className="text-primary-foreground/40 text-6xl sm:text-7xl font-display font-bold">
              {String(month + 1).padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

export default CalendarImage;
