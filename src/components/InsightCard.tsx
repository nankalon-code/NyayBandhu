import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, TrendingDown, Info, ArrowRight } from "lucide-react";
import { ShapleyResult, formatValue } from "@/lib/shapley";

interface InsightCardProps {
  results: ShapleyResult[];
  totalResource: number;
  resourceUnit: string;
  isSingleState: boolean;
}

export function InsightCard({ results, totalResource, resourceUnit, isSingleState }: InsightCardProps) {
  if (isSingleState) {
    const state = results[0];
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-6 border-l-4 border-l-primary/50"
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-4.5 h-4.5 text-primary" />
          </div>
          <div className="space-y-2">
            <h4 className="font-display font-semibold text-foreground text-sm">
              Single State — Baseline Value
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">{state.playerName}</strong> has a standalone value of{" "}
              <strong className="text-primary font-mono">{formatValue(totalResource, resourceUnit)}</strong> based on its
              population, development metrics, and scheme coverage. This is the{" "}
              <em>baseline</em> — the amount this state would receive if it were the only participant.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <ArrowRight className="w-3.5 h-3.5 text-primary" />
              <p className="text-xs text-primary font-display font-medium">
                Add more states to see how Shapley Values distribute the budget fairly across coalitions with synergy bonuses.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Multi-state insights
  const sorted = [...results].sort((a, b) => b.shapleyValue - a.shapleyValue);
  const highest = sorted[0];
  const lowest = sorted[sorted.length - 1];
  const gap = highest.percentage - lowest.percentage;
  const isBalanced = gap < 15;

  const insights: { icon: React.ReactNode; text: string; highlight?: boolean }[] = [
    {
      icon: <TrendingUp className="w-4 h-4 text-primary" />,
      text: `${highest.playerName} receives the largest share (${highest.percentage.toFixed(1)}%) — reflecting its higher need and contribution metrics.`,
    },
    {
      icon: <TrendingDown className="w-4 h-4 text-accent" />,
      text: `${lowest.playerName} receives ${lowest.percentage.toFixed(1)}% — proportional to its marginal contribution across all coalitions.`,
    },
    {
      icon: <Lightbulb className="w-4 h-4 text-primary" />,
      text: isBalanced
        ? `The allocation is well-balanced (${gap.toFixed(1)}% gap). These states have similar contribution profiles.`
        : `There's a ${gap.toFixed(1)}% gap between highest and lowest — this reflects genuine differences in need and contribution, not bias.`,
      highlight: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card rounded-2xl p-6"
    >
      <h4 className="font-display font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
        <Lightbulb className="w-4 h-4 text-primary" />
        Key Insights
      </h4>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className={`flex items-start gap-3 p-3 rounded-xl ${
              insight.highlight ? "bg-primary/5 border border-primary/10" : "bg-muted/30"
            }`}
          >
            <div className="shrink-0 mt-0.5">{insight.icon}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{insight.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
