import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Sparkles, Target, Users, BarChart3, Landmark, Heart, BookOpen } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay },
});

const axioms = [
  { name: "Efficiency", desc: "All resources are fully distributed — nothing is wasted", icon: Target, color: "text-primary" },
  { name: "Symmetry", desc: "Equal contributors always receive equal shares", icon: Users, color: "text-accent" },
  { name: "Null Player", desc: "Non-contributors receive nothing — no free-riding", icon: BarChart3, color: "text-primary" },
  { name: "Additivity", desc: "Results are consistent across combined scenarios", icon: Sparkles, color: "text-accent" },
];

const useCases = [
  { title: "Government Schemes", desc: "Swachh Bharat, MGNREGA, Ayushman Bharat fund distribution across 29 states", icon: Landmark },
  { title: "Disaster Relief", desc: "Fair allocation of supplies among NDRF, Army, NGOs, and local bodies", icon: Heart },
  { title: "State Budgets", desc: "Education, health, and infrastructure budget allocation based on impact", icon: BookOpen },
];

export function AboutSection() {
  const [activeAxiom, setActiveAxiom] = useState<number | null>(null);
  const [hoveredUseCase, setHoveredUseCase] = useState<number | null>(null);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <motion.div {...fadeUp(0)} className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.8 }}
          className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center"
        >
          <Sparkles className="w-8 h-8 text-primary" />
        </motion.div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight">
          What is{" "}
          <motion.span
            className="text-gradient-primary inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            NyayBandhu
          </motion.span>
          ?
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          NyayBandhu (meaning "Friend of Justice") is a fair resource allocation engine built for India. 
          It uses mathematical frameworks to distribute budgets, relief supplies, and government scheme funds 
          across states — ensuring every rupee is allocated based on contribution, need, and collaborative impact.
        </p>
      </motion.div>

      {/* Animated Stats */}
      <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatedCounter end={29} suffix="+" label="States" sublabel="All covered" />
        <AnimatedCounter end={5} suffix="+" label="Schemes" sublabel="Government programs" />
        <AnimatedCounter end={4} label="Axioms" sublabel="Fairness guaranteed" />
        <AnimatedCounter end={100} suffix="%" label="Fair" sublabel="Mathematically proven" />
      </motion.div>

      {/* The Math + How It Works */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div {...fadeUp(0.1)} whileHover={{ y: -4 }} className="glass-card rounded-2xl p-7 transition-shadow hover:glow-teal">
          <h3 className="font-display font-semibold text-lg text-foreground mb-3">The Shapley Value</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Developed by Lloyd Shapley (Nobel Prize in Economics, 2012), 
            the Shapley Value is the only allocation method that satisfies all four fundamental fairness axioms simultaneously.
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-muted/60 rounded-xl p-4 font-mono text-sm text-foreground cursor-default"
          >
            <p className="mb-1">φᵢ(v) = Σ [|S|!(n-|S|-1)! / n!] × [v(S∪{'{'}i{'}'}) - v(S)]</p>
            <p className="text-xs text-muted-foreground mt-2">
              For each player i, sum over all coalitions S not containing i. 
              The weight ensures every ordering is equally likely.
            </p>
          </motion.div>
        </motion.div>

        <motion.div {...fadeUp(0.2)} whileHover={{ y: -4 }} className="glass-card rounded-2xl p-7 transition-shadow hover:glow-gold">
          <h3 className="font-display font-semibold text-lg text-foreground mb-3">How It Works Here</h3>
          <div className="space-y-4 text-sm text-muted-foreground">
            {[
              "Select Indian states or enter a custom budget to distribute",
              "The engine computes every possible coalition and synergy bonus between states",
              "Marginal contributions are weighted across all orderings",
              "Fair allocation is output — compared against equal split and proportional methods",
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                whileHover={{ x: 8 }}
                className="flex gap-3 cursor-default group"
              >
                <span className="font-mono text-primary font-semibold shrink-0 group-hover:scale-110 transition-transform">0{i + 1}</span>
                <p className="group-hover:text-foreground transition-colors">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Interactive Axioms */}
      <motion.div {...fadeUp(0.15)}>
        <h3 className="font-display font-semibold text-lg text-foreground mb-5 text-center">
          Four Axioms of Fairness
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {axioms.map((axiom, i) => {
            const Icon = axiom.icon;
            const isActive = activeAxiom === i;
            return (
              <motion.div
                key={axiom.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveAxiom(isActive ? null : i)}
                className={`glass-card rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                  isActive ? "border-primary/40 glow-teal" : "hover:border-primary/20"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                  isActive ? "bg-primary/15" : "bg-muted/80"
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <h4 className="font-display font-semibold text-sm text-foreground mb-1">{axiom.name}</h4>
                <AnimatePresence>
                  {isActive ? (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-muted-foreground leading-relaxed overflow-hidden"
                    >
                      {axiom.desc}
                    </motion.p>
                  ) : (
                    <motion.div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>Tap to learn</span>
                      <ChevronRight className="w-3 h-3" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Use Cases */}
      <motion.div {...fadeUp(0.2)}>
        <h3 className="font-display font-semibold text-lg text-foreground mb-5 text-center">Built for India</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            const isHovered = hoveredUseCase === i;
            return (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                onHoverStart={() => setHoveredUseCase(i)}
                onHoverEnd={() => setHoveredUseCase(null)}
                className="glass-card rounded-2xl p-6 cursor-default group relative overflow-hidden"
              >
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-primary/5 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-display font-semibold text-sm text-foreground mb-2">{uc.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{uc.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
