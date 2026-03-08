import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  sublabel?: string;
}

export function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2, label, sublabel }: AnimatedCounterProps) {
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="glass-card rounded-2xl p-5 text-center cursor-default group"
    >
      <div className="font-mono text-3xl font-bold text-primary group-hover:text-gradient-primary transition-colors">
        {prefix}{count}{suffix}
      </div>
      <div className="font-display text-sm font-medium text-foreground mt-1">{label}</div>
      {sublabel && <div className="font-mono text-[10px] text-muted-foreground mt-0.5">{sublabel}</div>}
    </motion.div>
  );
}
