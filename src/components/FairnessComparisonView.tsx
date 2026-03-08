import { motion } from "framer-motion";
import { FairnessComparison, formatValue } from "@/lib/shapley";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { GlossaryTooltip } from "@/components/HelpTooltip";

interface FairnessComparisonViewProps {
  comparisons: FairnessComparison[];
  resourceUnit: string;
}

export function FairnessComparisonView({ comparisons, resourceUnit }: FairnessComparisonViewProps) {
  const players = comparisons[0].allocations.map((a) => a.playerName);
  const chartData = players.map((name, i) => {
    const row: Record<string, string | number> = { name };
    comparisons.forEach((c) => {
      row[c.method] = Math.round(c.allocations[i].value);
    });
    return row;
  });

  const methodColors: Record<string, string> = {
    "Equal Split": "hsl(var(--muted-foreground))",
    "Proportional": "hsl(var(--gold))",
    "Shapley Value": "hsl(var(--primary))",
  };

  const methodIcons: Record<string, React.ReactNode> = {
    "Equal Split": <XCircle className="w-5 h-5 text-muted-foreground" />,
    "Proportional": <AlertTriangle className="w-5 h-5 text-accent" />,
    "Shapley Value": <CheckCircle2 className="w-5 h-5 text-primary" />,
  };

  const fairnessScores: Record<string, { score: string; label: string; desc: string }> = {
    "Equal Split": { score: "2/5", label: "Naive", desc: "Ignores all differences in contribution" },
    "Proportional": { score: "3/5", label: "Partial", desc: "Ignores synergy between coalitions" },
    "Shapley Value": { score: "5/5", label: "Optimal", desc: "Only method satisfying all fairness axioms" },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-1 flex items-center justify-center gap-2">
          Fairness Comparison
          <GlossaryTooltip id="fairness-axioms" />
        </h2>
        <p className="text-muted-foreground text-sm">
          Why Shapley Values outperform naive methods — each bar shows what a state would receive under different approaches
        </p>
      </div>

      {/* Grouped Bar Chart */}
      <div className="glass-card rounded-2xl p-6">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} barGap={4} barCategoryGap="20%">
            <XAxis
              dataKey="name"
              tick={{ fontFamily: "Space Grotesk", fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontFamily: "JetBrains Mono", fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => formatValue(v, resourceUnit)}
            />
            <Tooltip
              formatter={(value: number, name: string) => [formatValue(value, resourceUnit), name]}
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                fontFamily: "Space Grotesk",
                fontSize: "0.8rem",
                color: "hsl(var(--foreground))",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend
              wrapperStyle={{ fontFamily: "Space Grotesk", fontSize: "0.8rem", color: "hsl(var(--foreground))" }}
            />
            {comparisons.map((c) => (
              <Bar
                key={c.method}
                dataKey={c.method}
                fill={methodColors[c.method]}
                radius={[6, 6, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Method Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {comparisons.map((c, i) => {
          const fs = fairnessScores[c.method];
          return (
            <motion.div
              key={c.method}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              className={`rounded-2xl border-2 p-5 transition-all ${
                c.method === "Shapley Value"
                  ? "border-primary glass-card glow-teal"
                  : "border-border/30 glass-card"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                {methodIcons[c.method]}
                <h3 className="font-display font-semibold text-foreground">{c.method}</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">{c.description}</p>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-mono text-2xl font-bold text-foreground">{fs.score}</span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    c.method === "Shapley Value"
                      ? "bg-primary/15 text-primary"
                      : c.method === "Proportional"
                      ? "bg-accent/15 text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {fs.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{fs.desc}</p>

              <div className="mt-4 pt-3 border-t border-border/30 space-y-2">
                {c.allocations.map((a) => (
                  <div key={a.playerId} className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: a.color }} />
                      <span className="text-xs text-muted-foreground truncate max-w-[100px]">
                        {a.playerName}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-foreground">
                      {formatValue(a.value, resourceUnit)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Axioms */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="glass-card rounded-2xl p-6 border-primary/15"
      >
        <h4 className="font-display font-semibold text-foreground mb-3">
          Why Shapley is the Only Fair Method
        </h4>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { name: "Efficiency", desc: "All resources are fully distributed" },
            { name: "Symmetry", desc: "Equal contributors get equal shares" },
            { name: "Null Player", desc: "Non-contributors receive nothing" },
            { name: "Additivity", desc: "Consistent across combined scenarios" },
          ].map((axiom) => (
            <div key={axiom.name} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <span className="font-display font-medium text-sm text-foreground">
                  {axiom.name}
                </span>
                <p className="text-xs text-muted-foreground">{axiom.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 font-mono">
          Shapley&apos;s theorem: The Shapley Value is the <em>unique</em> allocation satisfying all four axioms.
        </p>
      </motion.div>
    </motion.div>
  );
}
