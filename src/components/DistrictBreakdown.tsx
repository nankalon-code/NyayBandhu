import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { distributeToDistricts } from "@/lib/districtData";
import { formatValue } from "@/lib/shapley";
import { ChevronDown, ChevronUp, School, Users, TrendingDown, Info } from "lucide-react";

interface DistrictBreakdownProps {
  stateId: string;
  stateName: string;
  stateBudget: number;
  category: "cleanliness" | "education" | "health" | "overall";
  resourceUnit: string;
  color: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  cleanliness: "Cleanliness",
  education: "Literacy",
  health: "Health",
  overall: "Composite",
};

export function DistrictBreakdown({
  stateId,
  stateName,
  stateBudget,
  category,
  resourceUnit,
  color,
}: DistrictBreakdownProps) {
  const [expanded, setExpanded] = useState(false);

  const districtAllocations = useMemo(
    () => distributeToDistricts(stateId, stateBudget, category),
    [stateId, stateBudget, category]
  );

  if (!districtAllocations) return null;

  const topDistrict = districtAllocations[0];
  const bottomDistrict = districtAllocations[districtAllocations.length - 1];
  const maxAllocation = topDistrict.allocation;

  return (
    <div className="rounded-xl border border-border/40 overflow-hidden bg-card/50">
      {/* Collapsed header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          <div className="text-left">
            <span className="font-display font-semibold text-sm text-foreground">{stateName}</span>
            <span className="text-xs text-muted-foreground ml-2">
              {districtAllocations.length} districts
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold text-foreground">
            {formatValue(stateBudget, resourceUnit)}
          </span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Explainer */}
            <div className="px-4 pb-3">
              <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Budget is distributed based on <span className="text-foreground font-medium">need</span>: 
                  districts with lower {CATEGORY_LABELS[category]} scores and higher population get more funds. 
                  This ensures areas that need the most help receive proportionally larger allocations.
                </p>
              </div>
            </div>

            {/* Summary stats */}
            <div className="px-4 pb-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-muted/40 p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingDown className="w-3 h-3 text-destructive" />
                  <span className="text-[10px] text-muted-foreground font-display">Highest Need</span>
                </div>
                <p className="font-display font-semibold text-xs text-foreground">{topDistrict.district.name}</p>
                <p className="font-mono text-[10px] text-primary">{formatValue(topDistrict.allocation, resourceUnit)}</p>
              </div>
              <div className="rounded-lg bg-muted/40 p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <School className="w-3 h-3 text-primary" />
                  <span className="text-[10px] text-muted-foreground font-display">Lowest Need</span>
                </div>
                <p className="font-display font-semibold text-xs text-foreground">{bottomDistrict.district.name}</p>
                <p className="font-mono text-[10px] text-muted-foreground">{formatValue(bottomDistrict.allocation, resourceUnit)}</p>
              </div>
            </div>

            {/* District list */}
            <div className="px-4 pb-4 space-y-2">
              {districtAllocations.map((item, i) => (
                <motion.div
                  key={item.district.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-muted-foreground w-4 text-right">
                        {i + 1}.
                      </span>
                      <span className="font-display text-xs font-medium text-foreground">
                        {item.district.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                        <Users className="w-3 h-3" />
                        {item.district.population}L
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {item.percentage}%
                      </span>
                      <span className="font-mono text-xs font-semibold text-foreground min-w-[70px] text-right">
                        {formatValue(item.allocation, resourceUnit)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-6 h-1.5 rounded-full bg-muted/60 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.allocation / maxAllocation) * 100}%` }}
                      transition={{ delay: 0.1 + i * 0.03, duration: 0.5 }}
                    />
                  </div>
                  {/* Metric detail on hover / always visible */}
                  <div className="ml-6 mt-1 flex gap-3 text-[10px] font-mono text-muted-foreground">
                    <span>🧹 {item.district.cleanlinessScore}</span>
                    <span>📚 {item.district.literacyRate}%</span>
                    <span>🏥 {item.district.healthIndex}</span>
                    <span>🏫 {item.district.schoolCount} schools</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
