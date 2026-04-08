import { memo } from "react";

const WireBinding = memo(function WireBinding() {
  const rings = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="relative w-full h-8 flex items-center justify-center z-10">
      {/* Wire shadow */}
      <div className="absolute inset-x-8 h-3 top-3 rounded-full bg-foreground/5 blur-sm" />
      {/* Rings */}
      <div className="flex justify-between px-8 w-full">
        {rings.map((i) => (
          <div
            key={i}
            className="w-5 h-7 rounded-full border-2 border-calendar-wire bg-transparent relative"
            style={{
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.15), 0 1px 1px rgba(255,255,255,0.5)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-calendar-wire/10" />
          </div>
        ))}
      </div>
    </div>
  );
});

export default WireBinding;
