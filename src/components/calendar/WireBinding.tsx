import { memo } from "react";

const WireBinding = memo(function WireBinding() {
  const coils = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="relative w-full h-10 flex items-center justify-center z-10 bg-gradient-to-b from-muted/40 to-transparent">
      
      <div className="flex justify-between px-4 sm:px-6 w-full items-center">
        {coils.map((i) => (
          <div
            key={i}
            className="relative"
            style={{ width: "12px", height: "28px" }}
          >
            
            <div
              className="absolute inset-0 rounded-full border-[1.5px]"
              style={{
                borderColor: "hsl(var(--calendar-wire))",
                background: "linear-gradient(180deg, hsl(var(--calendar-wire) / 0.15) 0%, transparent 50%)",
                boxShadow: "0 2px 3px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.3)",
              }}
            />

            <div
              className="absolute left-1/2 -translate-x-1/2 -top-1 w-[1.5px] h-[30px]"
              style={{
                background: "linear-gradient(180deg, hsl(var(--calendar-wire)) 0%, hsl(var(--calendar-wire) / 0.6) 100%)",
              }}
            />
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-b from-foreground/[0.06] to-transparent" />
    </div>
  );
});

export default WireBinding;
