import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay },
});

export function AboutSection() {
  return (
    <div className="space-y-14">
      {/* Hero */}
      <motion.div {...fadeUp(0)} className="text-center max-w-3xl mx-auto">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-5 leading-tight">
          What is <span className="text-gradient-primary">NyayBandhu</span>?
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          NyayBandhu (meaning "Friend of Justice") is a fair resource allocation engine built for India. 
          It uses mathematical frameworks to distribute budgets, relief supplies, and government scheme funds 
          across states — ensuring every rupee is allocated based on contribution, need, and collaborative impact.
        </p>
      </motion.div>

      {/* The Math */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div {...fadeUp(0.1)} className="glass-card rounded-2xl p-7">
          <h3 className="font-display font-semibold text-lg text-foreground mb-3">The Shapley Value</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Developed by Lloyd Shapley (Nobel Prize in Economics, 2012), 
            the Shapley Value is the only allocation method that satisfies all four fundamental fairness axioms simultaneously.
          </p>
          <div className="bg-muted/60 rounded-xl p-4 font-mono text-sm text-foreground">
            <p className="mb-1">φᵢ(v) = Σ [|S|!(n-|S|-1)! / n!] × [v(S∪{'{'}i{'}'}) - v(S)]</p>
            <p className="text-xs text-muted-foreground mt-2">
              For each player i, sum over all coalitions S not containing i. 
              The weight ensures every ordering is equally likely.
            </p>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.2)} className="glass-card rounded-2xl p-7">
          <h3 className="font-display font-semibold text-lg text-foreground mb-3">How It Works Here</h3>
          <div className="space-y-4 text-sm text-muted-foreground">
            {[
              "Select Indian states or enter a custom budget to distribute",
              "The engine computes every possible coalition and synergy bonus between states",
              "Marginal contributions are weighted across all orderings",
              "Fair allocation is output — compared against equal split and proportional methods",
            ].map((text, i) => (
              <div key={i} className="flex gap-3">
                <span className="font-mono text-primary font-semibold shrink-0">0{i + 1}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fairness Axioms */}
      <motion.div {...fadeUp(0.15)} className="glass-card rounded-2xl p-7 border-primary/10">
        <h3 className="font-display font-semibold text-lg text-foreground mb-5">
          Four Axioms of Fairness
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { name: "Efficiency", desc: "All resources are fully distributed — nothing is wasted" },
            { name: "Symmetry", desc: "Equal contributors always receive equal shares" },
            { name: "Null Player", desc: "Non-contributors receive nothing — no free-riding" },
            { name: "Additivity", desc: "Results are consistent across combined scenarios" },
          ].map((axiom) => (
            <div key={axiom.name} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <span className="font-display font-medium text-sm text-foreground">{axiom.name}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{axiom.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Use Cases */}
      <motion.div {...fadeUp(0.2)}>
        <h3 className="font-display font-semibold text-lg text-foreground mb-5">Built for India</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: "Government Schemes", desc: "Swachh Bharat, MGNREGA, Ayushman Bharat fund distribution across 29 states" },
            { title: "Disaster Relief", desc: "Fair allocation of supplies among NDRF, Army, NGOs, and local bodies" },
            { title: "State Budgets", desc: "Education, health, and infrastructure budget allocation based on impact" },
          ].map((uc) => (
            <div key={uc.title} className="glass-card rounded-2xl p-5">
              <h4 className="font-display font-semibold text-sm text-foreground mb-2">{uc.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{uc.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
