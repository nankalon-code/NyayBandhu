import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { IndiaMap } from "@/components/IndiaMap";
import { AllocationResults } from "@/components/AllocationResults";
import { FairnessComparisonView } from "@/components/FairnessComparisonView";
import { INDIAN_STATES, REGION_GROUPS, generateLocationScenario } from "@/lib/indianData";
import { calculateShapleyValues, calculateFairnessComparisons } from "@/lib/shapley";
import { ArrowRight, BarChart3, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CATEGORIES = [
  { id: "cleanliness" as const, label: "Swachh Bharat (Cleanliness)" },
  { id: "education" as const, label: "Samagra Shiksha (Education)" },
  { id: "health" as const, label: "Ayushman Bharat (Health)" },
  { id: "overall" as const, label: "Composite Index" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay },
});

export function BudgetAllocator() {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [category, setCategory] = useState<"cleanliness" | "education" | "health" | "overall">("cleanliness");
  const [showResults, setShowResults] = useState(false);
  const [resultTab, setResultTab] = useState<"allocation" | "comparison">("allocation");
  const [mapColorMode, setMapColorMode] = useState<"cleanliness" | "literacy" | "health">("cleanliness");
  const [customBudget, setCustomBudget] = useState<string>("");

  const toggleState = useCallback((id: string) => {
    setSelectedStates((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : prev.length < 6 ? [...prev, id] : prev
    );
    setShowResults(false);
  }, []);

  const selectRegion = (regionId: string) => {
    const region = REGION_GROUPS.find((r) => r.id === regionId);
    if (region) {
      setSelectedStates(region.states.slice(0, 6));
      setShowResults(false);
    }
  };

  const scenario = useMemo(
    () => (selectedStates.length >= 1 ? generateLocationScenario(selectedStates, category) : null),
    [selectedStates, category]
  );

  const adjustedScenario = useMemo(() => {
    if (!scenario) return null;
    const budget = customBudget ? parseFloat(customBudget) : 0;
    if (budget > 0) {
      const scale = budget / scenario.totalResource;
      return {
        ...scenario,
        totalResource: budget,
        coalitionValues: scenario.coalitionValues.map((cv) => ({
          ...cv,
          value: Math.round(cv.value * scale),
        })),
      };
    }
    return scenario;
  }, [scenario, customBudget]);

  const results = useMemo(
    () => (adjustedScenario ? calculateShapleyValues(adjustedScenario.players, adjustedScenario.coalitionValues) : null),
    [adjustedScenario]
  );

  const comparisons = useMemo(
    () =>
      adjustedScenario && results
        ? calculateFairnessComparisons(adjustedScenario.players, adjustedScenario.coalitionValues, results, adjustedScenario.totalResource)
        : null,
    [adjustedScenario, results]
  );

  const selectedStateData = INDIAN_STATES.filter((s) => selectedStates.includes(s.id));

  return (
    <section className="space-y-10">
      {/* Header */}
      <motion.div {...fadeUp(0)} className="text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">Budget Allocator</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Select states, enter your budget, choose a scheme category — get mathematically fair allocation
        </p>
      </motion.div>

      {/* Custom Budget Input */}
      <motion.div {...fadeUp(0.05)} className="max-w-md mx-auto glass-card rounded-2xl p-6">
        <label className="font-display text-sm font-medium text-foreground mb-2.5 block">
          Enter Total Budget (₹ Crores)
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground">₹</span>
            <Input
              type="number"
              placeholder="e.g. 5000"
              value={customBudget}
              onChange={(e) => { setCustomBudget(e.target.value); setShowResults(false); }}
              className="pl-7 font-mono"
              min="0"
            />
          </div>
          <span className="self-center text-xs text-muted-foreground font-mono">Cr</span>
        </div>
        <p className="text-[11px] text-muted-foreground mt-2.5">
          Leave empty to use auto-calculated values based on state metrics
        </p>
      </motion.div>

      {/* Region Select */}
      <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-2 justify-center">
        {REGION_GROUPS.map((region) => (
          <button
            key={region.id}
            onClick={() => selectRegion(region.id)}
            className="px-4 py-2 rounded-full text-xs font-display font-medium glass-card hover:bg-muted/50 transition-all duration-300 text-foreground"
          >
            {region.name}
          </button>
        ))}
        <button
          onClick={() => { setSelectedStates([]); setShowResults(false); }}
          className="px-4 py-2 rounded-full text-xs font-display font-medium border border-destructive/30 text-destructive hover:bg-destructive/5 transition-all duration-300"
        >
          Clear
        </button>
      </motion.div>

      {/* Map + State Info */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex gap-2 mb-3">
            {([
              { mode: "cleanliness" as const, label: "Cleanliness" },
              { mode: "literacy" as const, label: "Literacy" },
              { mode: "health" as const, label: "Health" },
            ]).map(({ mode, label }) => (
              <button
                key={mode}
                onClick={() => setMapColorMode(mode)}
                className={`px-3 py-1.5 rounded-full text-xs font-display font-medium transition-all duration-300 ${
                  mapColorMode === mode ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <IndiaMap
            states={INDIAN_STATES}
            selectedStateIds={selectedStates}
            onToggleState={toggleState}
            colorMode={mapColorMode}
          />
          <p className="text-[11px] text-muted-foreground mt-2.5">
            Click states to select (max 6). Circle size = population. Color = {mapColorMode} score.
          </p>
        </div>

        {/* Selected states panel */}
        <div className="glass-card rounded-2xl p-6 self-start">
          <h3 className="font-display font-semibold text-foreground mb-4 text-sm">
            Selected ({selectedStates.length}/6)
          </h3>
          {selectedStateData.length === 0 ? (
            <p className="text-xs text-muted-foreground">Click states on the map or use region buttons</p>
          ) : (
            <div className="space-y-2.5">
              {selectedStateData.map((state) => (
                <div key={state.id} className="p-3 rounded-xl bg-muted/40 border border-border/30">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-display font-medium text-sm text-foreground">{state.name}</span>
                    <button onClick={() => toggleState(state.id)} className="text-[10px] text-destructive hover:underline font-mono">
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
                    <div><span className="text-muted-foreground">CLN </span><span className="font-semibold text-foreground">{state.cleanlinessScore}</span></div>
                    <div><span className="text-muted-foreground">LIT </span><span className="font-semibold text-foreground">{state.literacyRate}%</span></div>
                    <div><span className="text-muted-foreground">HLT </span><span className="font-semibold text-foreground">{state.healthIndex}</span></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Category Selector */}
      {selectedStates.length >= 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <h3 className="font-display font-semibold text-foreground text-center">Choose Allocation Category</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setCategory(cat.id); setShowResults(false); }}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                  category === cat.id ? "border-primary bg-primary/5 glow-teal" : "glass-card hover:border-primary/30"
                }`}
              >
                <p className="font-display font-medium text-sm text-foreground">{cat.label}</p>
              </button>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={() => setShowResults(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold px-8 py-5 text-base rounded-xl"
            >
              Calculate Fair Allocation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Results */}
      {showResults && results && adjustedScenario && comparisons && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="pt-4">
          <div className="flex gap-2 mb-8 p-1 glass-card rounded-full w-fit mx-auto">
            <button
              onClick={() => setResultTab("allocation")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-display font-medium text-sm transition-all duration-300 ${
                resultTab === "allocation" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <PieChart className="w-4 h-4" /> Allocation
            </button>
            <button
              onClick={() => setResultTab("comparison")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-display font-medium text-sm transition-all duration-300 ${
                resultTab === "comparison" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Fairness Comparison
            </button>
          </div>

          {resultTab === "allocation" ? (
            <AllocationResults results={results} totalResource={adjustedScenario.totalResource} resourceUnit={adjustedScenario.resourceUnit} />
          ) : (
            <FairnessComparisonView comparisons={comparisons} resourceUnit={adjustedScenario.resourceUnit} />
          )}
        </motion.div>
      )}
    </section>
  );
}
