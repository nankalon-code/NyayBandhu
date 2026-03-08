import { motion } from "framer-motion";
import { ShapleyResult, formatValue } from "@/lib/shapley";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface AllocationResultsProps {
  results: ShapleyResult[];
  totalResource: number;
  resourceUnit: string;
}

export function AllocationResults({
  results,
  totalResource,
  resourceUnit,
}: AllocationResultsProps) {
  const pieData = results.map((r) => ({
    name: r.playerName,
    value: r.shapleyValue,
    color: r.color,
    percentage: r.percentage,
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">
          Fair Allocation Results
        </h2>
        <p className="text-muted-foreground text-sm">
          Computed using Shapley Values for mathematically fair distribution
        </p>
      </div>

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
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar breakdown */}
        <div className="space-y-4">
          {results.map((result, i) => (
            <motion.div
              key={result.playerId}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: result.color }}
                  />
                  <span className="font-display font-medium text-sm text-foreground">
                    {result.playerName}
                  </span>
                </div>
                <span className="font-mono text-sm font-semibold text-foreground">
                  {formatValue(result.shapleyValue, resourceUnit)}
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
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

      {/* Marginal contributions detail */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="surface-elevated rounded-xl p-6"
      >
        <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="text-gradient-gold">φ</span> Marginal Contributions Breakdown
        </h3>
        <div className="space-y-6">
          {results.map((result) => (
            <div key={result.playerId}>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-2 h-2 rounded-full"
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
                    className="bg-muted rounded-lg px-3 py-2 text-center"
                  >
                    <div className="font-mono text-xs text-muted-foreground mb-1">
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
        className="bg-primary/5 border border-primary/20 rounded-xl p-6"
      >
        <h4 className="font-display font-semibold text-foreground mb-2">
          The Math Behind It
        </h4>
        <div className="font-mono text-sm text-muted-foreground leading-relaxed space-y-1">
          <p>φᵢ(v) = Σ [|S|!(n-|S|-1)! / n!] × [v(S∪&#123;i&#125;) - v(S)]</p>
          <p className="text-xs mt-2">
            For each player i, we sum over all coalitions S not containing i.
            The weight ensures every ordering of players is equally likely.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
