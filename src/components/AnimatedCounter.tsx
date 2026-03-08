import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  sublabel?: string;
  accent?: "teal" | "gold";
}

export function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2, label, sublabel, accent = "teal" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  const glowClass = accent === "gold" ? "glow-gold" : "glow-teal";
  const borderGradient = accent === "gold"
    ? "from-accent/30 via-accent/10 to-accent/30"
    : "from-primary/30 via-primary/10 to-primary/30";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className={`relative rounded-2xl p-[1px] cursor-default group`}
    >
      {/* Gradient border */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${borderGradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
      <div className={`relative glass-card rounded-2xl p-5 text-center group-hover:${glowClass} transition-shadow`}>
        {/* Top accent line */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-12 rounded-full bg-gradient-to-r ${
          accent === "gold" ? "from-transparent via-accent to-transparent" : "from-transparent via-primary to-transparent"
        } opacity-60 group-hover:w-20 group-hover:opacity-100 transition-all duration-500`} />
        <div className={`font-mono text-3xl font-bold ${
          accent === "gold" ? "text-gradient-gold" : "text-gradient-primary"
        }`}>
          {prefix}{count}{suffix}
        </div>
        <div className="font-display text-sm font-medium text-foreground mt-1">{label}</div>
        {sublabel && <div className="font-mono text-[10px] text-muted-foreground mt-0.5">{sublabel}</div>}
      </div>
    </motion.div>
  );
}
