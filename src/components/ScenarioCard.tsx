import { motion } from "framer-motion";
import { Scenario } from "@/lib/shapley";

interface ScenarioCardProps {
  scenario: Scenario;
  isSelected: boolean;
  onSelect: () => void;
}

export function ScenarioCard({ scenario, isSelected, onSelect }: ScenarioCardProps) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full text-left p-6 rounded-xl border-2 transition-colors duration-200 ${
        isSelected
          ? "border-primary bg-primary/5 glow-teal"
          : "border-border bg-card hover:border-primary/30"
      }`}
    >
      <div className="text-3xl mb-3">{scenario.icon}</div>
      <h3 className="font-display font-semibold text-lg text-foreground mb-1">
        {scenario.name}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {scenario.description}
      </p>
      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs font-mono px-2 py-1 rounded-md bg-muted text-muted-foreground">
          {scenario.players.length} players
        </span>
        <span className="text-xs font-mono px-2 py-1 rounded-md bg-muted text-muted-foreground">
          {scenario.coalitionValues.length} coalitions
        </span>
      </div>
      {isSelected && (
        <motion.div
          layoutId="selected-indicator"
          className="absolute top-3 right-3 w-3 h-3 rounded-full bg-primary"
          initial={false}
        />
      )}
    </motion.button>
  );
}
