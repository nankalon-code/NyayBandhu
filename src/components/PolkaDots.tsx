import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Dot {
  id: number;
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
}

const GRID_COLS = 12;
const GRID_ROWS = 16;

const dots: Dot[] = Array.from({ length: GRID_COLS * GRID_ROWS }, (_, i) => {
  const col = i % GRID_COLS;
  const row = Math.floor(i / GRID_COLS);
  return {
    id: i,
    x: (col + 0.5) * (100 / GRID_COLS),
    y: (row + 0.5) * (100 / GRID_ROWS),
    size: 3 + Math.random() * 2,
    baseOpacity: 0.04 + Math.random() * 0.04,
  };
});

export function PolkaDots() {
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleDotClick = useCallback((dot: Dot) => {
    const rippleId = Date.now();
    setRipples((prev) => [...prev, { id: rippleId, x: dot.x, y: dot.y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== rippleId)), 800);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {dots.map((dot) => {
        const isHovered = hoveredDot === dot.id;
        const dist = hoveredDot !== null
          ? Math.hypot(dot.x - dots[hoveredDot].x, dot.y - dots[hoveredDot].y)
          : 999;
        const nearHover = dist < 12;

        return (
          <div
            key={dot.id}
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              transform: "translate(-50%, -50%)",
              padding: "8px",
            }}
            onMouseEnter={() => setHoveredDot(dot.id)}
            onMouseLeave={() => setHoveredDot(null)}
            onClick={() => handleDotClick(dot)}
          >
            <div
              className="rounded-full bg-primary transition-all duration-500 ease-out"
              style={{
                width: isHovered ? dot.size * 2.5 : nearHover ? dot.size * 1.4 : dot.size,
                height: isHovered ? dot.size * 2.5 : nearHover ? dot.size * 1.4 : dot.size,
                opacity: isHovered ? 0.35 : nearHover ? dot.baseOpacity * 2.5 : dot.baseOpacity,
              }}
            />
          </div>
        );
      })}

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border border-primary/20"
            style={{ left: `${ripple.x}%`, top: `${ripple.y}%`, transform: "translate(-50%, -50%)" }}
            initial={{ width: 0, height: 0, opacity: 0.4 }}
            animate={{ width: 120, height: 120, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
