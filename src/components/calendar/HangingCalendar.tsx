import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import CalendarImage from "./CalendarImage";
import WireBinding from "./WireBinding";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import { useCalendar } from "@/hooks/useCalendar";

export default function HangingCalendar() {
  const {
    year, month, range, isFlipping, notes,
    goToMonth, handleDayClick, clearRange,
    addNote, deleteNote,
  } = useCalendar();

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [2, -2]), { stiffness: 150, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-3, 3]), { stiffness: 150, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="min-h-screen bg-background flex items-start justify-center px-4 py-8 sm:py-12 md:py-16"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20">
        <div className="w-3 h-3 rounded-full bg-calendar-wire shadow-md" />
        <div className="w-0.5 h-6 sm:h-8 bg-calendar-wire/60 mx-auto" />
      </div>

      <motion.div
        ref={containerRef}
        style={{
          rotateX,
          rotateY,
          perspective: 1200,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mt-10 sm:mt-2"
      >
    
        <div
          className="absolute inset-x-1 inset-y-1 rounded-xl bg-muted border border-border"
          style={{ transform: "translateZ(-6px) translateY(6px)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        />
        <div
          className="absolute inset-x-0.5 inset-y-0.5 rounded-xl bg-muted/80 border border-border/60"
          style={{ transform: "translateZ(-3px) translateY(3px)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
        />

        
        <div className="absolute -inset-4 sm:-inset-6 rounded-2xl bg-foreground/[0.06] blur-2xl -z-10 translate-y-4" />
        <div className="absolute -inset-2 sm:-inset-3 rounded-xl bg-foreground/[0.03] blur-lg -z-10 translate-y-2" />

      
        <div className="rounded-xl overflow-hidden calendar-shadow bg-calendar-paper relative z-10">

          <CalendarImage month={month} year={year} isFlipping={isFlipping} />

          
          <WireBinding />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] divide-y lg:divide-y-0 lg:divide-x divide-border">
            <CalendarGrid
              year={year}
              month={month}
              range={range}
              onDayClick={handleDayClick}
              onPrev={() => goToMonth(-1)}
              onNext={() => goToMonth(1)}
            />
            <div className="p-3 sm:p-4">
              <NotesPanel
                range={range}
                notes={notes}
                onAddNote={addNote}
                onDeleteNote={deleteNote}
                onClearRange={clearRange}
                year={year}
                month={month}
              />
            </div>
          </div>
        </div>


        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-b from-transparent to-foreground/5 rounded-b-xl z-10" />
      </motion.div>
    </div>
  );
}
