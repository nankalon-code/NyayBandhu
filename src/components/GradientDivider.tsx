import { motion } from "framer-motion";

export function GradientDivider() {
  return (
    <div className="container max-w-6xl mx-auto px-6 py-1">
      <div className="relative h-[1px]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          animate={{ opacity: [0, 0.6, 0], x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
        />
        {/* Center dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
