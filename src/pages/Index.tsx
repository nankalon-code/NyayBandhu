import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScenarioCard } from "@/components/ScenarioCard";
import { AllocationResults } from "@/components/AllocationResults";
import { FairnessComparisonView } from "@/components/FairnessComparisonView";
import { SCENARIOS, calculateShapleyValues, calculateFairnessComparisons } from "@/lib/shapley";
import { Scale, ArrowRight, Sparkles, BarChart3, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<"allocation" | "comparison">("allocation");

  const selectedScenario = SCENARIOS.find((s) => s.id === selectedScenarioId);

  const results = useMemo(() => {
    if (!selectedScenario) return null;
    return calculateShapleyValues(
      selectedScenario.players,
      selectedScenario.coalitionValues
    );
  }, [selectedScenario]);

  const comparisons = useMemo(() => {
    if (!selectedScenario || !results) return null;
    return calculateFairnessComparisons(
      selectedScenario.players,
      selectedScenario.coalitionValues,
      results,
      selectedScenario.totalResource
    );
  }, [selectedScenario, results]);

  const handleCalculate = () => {
    if (selectedScenario) setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setSelectedScenarioId(null);
    setActiveTab("allocation");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative container max-w-5xl mx-auto px-6 pt-12 pb-10 md:pt-20 md:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-3 rounded-xl bg-primary/10 glow-teal">
              <Scale className="w-6 h-6 text-primary" />
            </div>
            <div>
              <span className="font-mono text-xs text-muted-foreground tracking-wider uppercase block">
                Cooperative Game Theory
              </span>
              <span className="font-mono text-xs text-accent tracking-wider uppercase">
                Made for Bharat 🇮🇳
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
          >
            <span className="text-foreground">Fair</span>{" "}
            <span className="text-gradient-primary">Allocation</span>{" "}
            <span className="text-foreground">Engine</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            Using <span className="text-gradient-gold font-semibold">Shapley Values</span> — the Nobel Prize-winning solution
            from game theory — to mathematically guarantee fair resource distribution across Indian states, agencies, and institutions.
          </motion.p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-6 mt-8"
          >
            {[
              { label: "Fairness Axioms", value: "4/4" },
              { label: "Scenarios", value: "3" },
              { label: "Theory", value: "Nobel 2012" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="font-mono text-xl font-bold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container max-w-5xl mx-auto px-6 py-12 md:py-16">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Scenario Selection */}
              <div className="mb-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                  Choose a Scenario
                </h2>
                <p className="text-sm text-muted-foreground">
                  Select a real-world Indian resource allocation problem to solve
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                {SCENARIOS.map((scenario) => (
                  <ScenarioCard
                    key={scenario.id}
                    scenario={scenario}
                    isSelected={selectedScenarioId === scenario.id}
                    onSelect={() => setSelectedScenarioId(scenario.id)}
                  />
                ))}
              </div>

              {/* Selected scenario details */}
              <AnimatePresence>
                {selectedScenario && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="surface-elevated rounded-xl p-6 mb-8 border border-border/50">
                      <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                        <span className="text-lg">{selectedScenario.icon}</span>
                        Coalition Values — {selectedScenario.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4">
                        Each coalition&apos;s value represents how much they can achieve together.
                        The Shapley Value fairly distributes the grand coalition&apos;s total value.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {selectedScenario.coalitionValues.map((cv, i) => (
                          <div
                            key={i}
                            className="bg-muted/70 rounded-lg px-3 py-3 border border-border/30"
                          >
                            <div className="font-mono text-xs text-muted-foreground mb-1">
                              &#123;{cv.coalition.join(", ")}&#125;
                            </div>
                            <div className="font-mono text-sm font-semibold text-foreground">
                              {cv.value.toLocaleString("en-IN")} {selectedScenario.resourceUnit}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button
                        onClick={handleCalculate}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold px-8 py-6 text-lg rounded-xl glow-teal"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Calculate Fair Allocation
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={handleReset}
                className="mb-8 text-sm text-muted-foreground hover:text-foreground font-display flex items-center gap-2 transition-colors"
              >
                ← Back to scenarios
              </button>

              {/* Tab Switcher */}
              <div className="flex gap-2 mb-10 p-1 bg-muted rounded-xl w-fit">
                <button
                  onClick={() => setActiveTab("allocation")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-display font-medium text-sm transition-all ${
                    activeTab === "allocation"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <PieChart className="w-4 h-4" />
                  Shapley Allocation
                </button>
                <button
                  onClick={() => setActiveTab("comparison")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-display font-medium text-sm transition-all ${
                    activeTab === "comparison"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Fairness Comparison
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "allocation" && results && selectedScenario && (
                  <motion.div
                    key="alloc"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AllocationResults
                      results={results}
                      totalResource={selectedScenario.totalResource}
                      resourceUnit={selectedScenario.resourceUnit}
                    />
                  </motion.div>
                )}
                {activeTab === "comparison" && comparisons && selectedScenario && (
                  <motion.div
                    key="compare"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FairnessComparisonView
                      comparisons={comparisons}
                      resourceUnit={selectedScenario.resourceUnit}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container max-w-5xl mx-auto px-6 text-center space-y-1">
          <p className="font-mono text-xs text-muted-foreground">
            Based on the Shapley Value — Lloyd Shapley, Nobel Memorial Prize in Economics 2012
          </p>
          <p className="font-mono text-xs text-muted-foreground/60">
            Built for Indian resource allocation scenarios
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
