import { motion } from "framer-motion";
import { ShapleyResult, formatValue } from "@/lib/shapley";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { InsightCard } from "@/components/InsightCard";
import { GlossaryTooltip } from "@/components/HelpTooltip";
import { DistrictBreakdown } from "@/components/DistrictBreakdown";
import { MapPinned } from "lucide-react";

interface AllocationResultsProps {
  results: ShapleyResult[];
  totalResource: number;
  resourceUnit: string;
  category?: "cleanliness" | "education" | "health" | "overall";
}

export function AllocationResults({
  results,
  totalResource,
  resourceUnit,
  category = "cleanliness",
}: AllocationResultsProps) {
  const pieData = results.map((r) => ({
    name: r.playerName,
    value: r.shapleyValue,
    color: r.color,
    percentage: r.percentage,
  }));

  const isSingleState = results.length === 1;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">
          Fair Allocation Results
        </h2>
        <p className="text-muted-foreground text-sm flex items-center justify-center gap-1.5">
          Total: <span className="font-mono font-semibold text-foreground">{formatValue(totalResource, resourceUnit)}</span> distributed using Shapley Values
          <GlossaryTooltip id="shapley-value" />
        </p>
      </div>

      {/* Insight Card (contextual) */}
      <InsightCard
        results={results}
        totalResource={totalResource}
        resourceUnit={resourceUnit}
        isSingleState={isSingleState}
      />

      {/* Chart + Bars */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center"
        >
          <ResponsiveContainer width={280} height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => formatValue(value, resourceUnit)}
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.75rem",
                  fontFamily: "Space Grotesk",
                  fontSize: "0.875rem",
                  color: "hsl(var(--foreground))",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar breakdown */}
        <div className="space-y-5">
          {results.map((result, i) => (
            <motion.div
              key={result.playerId}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3.5 h-3.5 rounded-full ring-2 ring-background"
                    style={{ backgroundColor: result.color }}
                  />
                  <span className="font-display font-semibold text-sm text-foreground">
                    {result.playerName}
                  </span>
                </div>
                <span className="font-mono text-sm font-bold text-foreground">
                  {formatValue(result.shapleyValue, resourceUnit)}
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-muted/60 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: result.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${result.percentage}%` }}
                  transition={{ delay: 0.2 + 0.1 * i, duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                {result.percentage.toFixed(1)}% of total
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* District-level drill-down */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="space-y-4"
      >
        <div className="text-center">
          <h3 className="font-display font-semibold text-foreground flex items-center justify-center gap-2">
            <MapPinned className="w-5 h-5 text-primary" />
            District-Level Breakdown
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">
            Click any state to see how its allocation is distributed across districts based on need
          </p>
          <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono bg-accent/10 text-accent border border-accent/20">
            ⚠ Simulated data for demonstration
          </span>
        </div>
        <div className="space-y-2">
          {results.map((result) => (
            <DistrictBreakdown
              key={result.playerId}
              stateId={result.playerId}
              stateName={result.playerName}
              stateBudget={result.shapleyValue}
              category={category}
              resourceUnit={resourceUnit}
              color={result.color}
            />
          ))}
        </div>
      </motion.div>

      {/* Marginal contributions detail */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="glass-card rounded-2xl p-6"
      >
        <h3 className="font-display font-semibold text-foreground mb-1 flex items-center gap-2">
          <span className="text-gradient-gold">φ</span> Marginal Contributions Breakdown
          <GlossaryTooltip id="marginal-contribution" />
        </h3>
        <p className="text-[11px] text-muted-foreground mb-4">
          How much each state adds to every possible coalition it could join
        </p>
        <div className="space-y-6">
          {results.map((result) => (
            <div key={result.playerId}>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: result.color }}
                />
                <span className="font-display font-medium text-sm text-foreground">
                  {result.playerName}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {result.marginalContributions.map((mc, j) => (
                  <div
                    key={j}
                    className="bg-muted/40 rounded-xl px-3 py-2.5 text-center border border-border/20"
                  >
                    <div className="font-mono text-[10px] text-muted-foreground mb-1">
                      {mc.coalition.length === 0
                        ? "∅ (alone)"
                        : `+ {${mc.coalition.join(", ")}}`}
                    </div>
                    <div
                      className="font-mono text-sm font-semibold"
                      style={{ color: mc.marginal > 0 ? result.color : "hsl(var(--muted-foreground))" }}
                    >
                      {mc.marginal > 0 ? "+" : ""}
                      {formatValue(mc.marginal, resourceUnit)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Formula explanation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="glass-card rounded-2xl p-6 border-primary/15"
      >
        <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
          The Math Behind It
          <GlossaryTooltip id="fairness-axioms" />
        </h4>
        <div className="font-mono text-sm text-muted-foreground leading-relaxed space-y-1">
          <p className="text-foreground">φᵢ(v) = Σ [|S|!(n-|S|-1)! / n!] × [v(S∪&#123;i&#125;) - v(S)]</p>
          <p className="text-xs mt-2">
            For each player i, we sum over all coalitions S not containing i.
            The weight ensures every ordering of players is equally likely.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
