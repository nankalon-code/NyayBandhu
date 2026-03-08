import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { IndiaMap } from "@/components/IndiaMap";
import { AllocationResults } from "@/components/AllocationResults";
import { FairnessComparisonView } from "@/components/FairnessComparisonView";
import {
  INDIAN_STATES,
  REGION_GROUPS,
  generateLocationScenario,
  getCategoryIcon,
} from "@/lib/indianData";
import { calculateShapleyValues, calculateFairnessComparisons } from "@/lib/shapley";
import { MapPin, Sparkles, ArrowRight, BarChart3, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { id: "cleanliness" as const, label: "Swachh Bharat (Cleanliness)", icon: "🧹" },
  { id: "education" as const, label: "Samagra Shiksha (Education)", icon: "📚" },
  { id: "health" as const, label: "Ayushman Bharat (Health)", icon: "🏥" },
  { id: "overall" as const, label: "Composite Index", icon: "🇮🇳" },
];

export function LocationAllocator() {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [category, setCategory] = useState<"cleanliness" | "education" | "health" | "overall">("cleanliness");
  const [showResults, setShowResults] = useState(false);
  const [resultTab, setResultTab] = useState<"allocation" | "comparison">("allocation");
  const [mapColorMode, setMapColorMode] = useState<"cleanliness" | "literacy" | "health">("cleanliness");

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
    () => (selectedStates.length >= 2 ? generateLocationScenario(selectedStates, category) : null),
    [selectedStates, category]
  );

  const results = useMemo(
    () => (scenario ? calculateShapleyValues(scenario.players, scenario.coalitionValues) : null),
    [scenario]
  );

  const comparisons = useMemo(
    () =>
      scenario && results
        ? calculateFairnessComparisons(scenario.players, scenario.coalitionValues, results, scenario.totalResource)
        : null,
    [scenario, results]
  );

  const selectedStateData = INDIAN_STATES.filter((s) => selectedStates.includes(s.id));

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-accent/15">
          <MapPin className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Location-Based Allocation
          </h2>
          <p className="text-sm text-muted-foreground">
            Select states on the map, choose a gov scheme, get fair allocation
          </p>
        </div>
      </div>

      {/* Quick Region Select */}
      <div className="flex flex-wrap gap-2">
        {REGION_GROUPS.map((region) => (
          <button
            key={region.id}
            onClick={() => selectRegion(region.id)}
            className="px-4 py-2 rounded-lg text-sm font-display font-medium border border-border bg-card hover:bg-muted transition-colors text-foreground"
          >
            {region.name}
          </button>
        ))}
        <button
          onClick={() => { setSelectedStates([]); setShowResults(false); }}
          className="px-4 py-2 rounded-lg text-sm font-display font-medium border border-destructive/30 text-destructive hover:bg-destructive/5 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Map + State Info */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Map color mode toggle */}
          <div className="flex gap-2 mb-3">
            {([
              { mode: "cleanliness" as const, label: "🧹 Cleanliness" },
              { mode: "literacy" as const, label: "📚 Literacy" },
              { mode: "health" as const, label: "🏥 Health" },
            ]).map(({ mode, label }) => (
              <button
                key={mode}
                onClick={() => setMapColorMode(mode)}
                className={`px-3 py-1.5 rounded-md text-xs font-display font-medium transition-colors ${
                  mapColorMode === mode ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
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
          <p className="text-xs text-muted-foreground mt-2">
            Click on states to select them (max 6). Circle size = population. Color = {mapColorMode} score.
          </p>
        </div>

        {/* Selected states panel */}
        <div className="surface-elevated rounded-xl p-5 border border-border/50 self-start">
          <h3 className="font-display font-semibold text-foreground mb-3">
            Selected States ({selectedStates.length}/6)
          </h3>
          {selectedStateData.length === 0 ? (
            <p className="text-sm text-muted-foreground">Click states on the map or use region buttons above</p>
          ) : (
            <div className="space-y-3">
              {selectedStateData.map((state) => (
                <div key={state.id} className="p-3 rounded-lg bg-muted/70 border border-border/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-display font-medium text-sm text-foreground">{state.name}</span>
                    <button
                      onClick={() => toggleState(state.id)}
                      className="text-xs text-destructive hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">🧹</span>{" "}
                      <span className="font-mono font-semibold text-foreground">{state.cleanlinessScore}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">📚</span>{" "}
                      <span className="font-mono font-semibold text-foreground">{state.literacyRate}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">🏥</span>{" "}
                      <span className="font-mono font-semibold text-foreground">{state.healthIndex}</span>
                    </div>
                  </div>
                  {/* Schemes */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {state.schemes.map((scheme) => (
                      <span
                        key={scheme.name}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono"
                      >
                        {getCategoryIcon(scheme.category)} {scheme.name.split(" ")[0]}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Category Selector */}
      {selectedStates.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="font-display font-semibold text-foreground">Choose Allocation Category</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setCategory(cat.id); setShowResults(false); }}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  category === cat.id
                    ? "border-primary bg-primary/5 glow-teal"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <p className="font-display font-medium text-sm mt-2 text-foreground">{cat.label}</p>
              </button>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={() => setShowResults(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold px-8 py-6 text-lg rounded-xl glow-teal"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Calculate Fair Allocation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Results */}
      {showResults && results && scenario && comparisons && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-4"
        >
          {/* Tab switcher */}
          <div className="flex gap-2 mb-8 p-1 bg-muted rounded-xl w-fit">
            <button
              onClick={() => setResultTab("allocation")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-display font-medium text-sm transition-all ${
                resultTab === "allocation" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <PieChart className="w-4 h-4" />
              Shapley Allocation
            </button>
            <button
              onClick={() => setResultTab("comparison")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-display font-medium text-sm transition-all ${
                resultTab === "comparison" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Fairness Comparison
            </button>
          </div>

          {resultTab === "allocation" ? (
            <AllocationResults
              results={results}
              totalResource={scenario.totalResource}
              resourceUnit={scenario.resourceUnit}
              category={category}
            />
          ) : (
            <FairnessComparisonView
              comparisons={comparisons}
              resourceUnit={scenario.resourceUnit}
            />
          )}
        </motion.div>
      )}
    </section>
  );
}
