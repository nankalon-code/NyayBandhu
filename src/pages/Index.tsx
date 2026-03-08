import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScenarioCard } from "@/components/ScenarioCard";
import { AllocationResults } from "@/components/AllocationResults";
import { SCENARIOS, calculateShapleyValues } from "@/lib/shapley";
import { Scale, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const selectedScenario = SCENARIOS.find((s) => s.id === selectedScenarioId);

  const results = useMemo(() => {
    if (!selectedScenario) return null;
    return calculateShapleyValues(
      selectedScenario.players,
      selectedScenario.coalitionValues
    );
  }, [selectedScenario]);

  const handleCalculate = () => {
    if (selectedScenario) setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setSelectedScenarioId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative container max-w-5xl mx-auto px-6 pt-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-3 rounded-xl bg-primary/10 glow-teal">
              <Scale className="w-6 h-6 text-primary" />
            </div>
            <span className="font-mono text-sm text-muted-foreground tracking-wider uppercase">
              Cooperative Game Theory
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-4"
          >
            <span className="text-foreground">Fair</span>{" "}
            <span className="text-gradient-primary">Allocation</span>{" "}
            <span className="text-foreground">Engine</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            Using <span className="text-gradient-gold font-semibold">Shapley Values</span> — the Nobel Prize-winning solution
            from game theory — to mathematically guarantee fair resource distribution.
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-5xl mx-auto px-6 pb-20">
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
                  Select a real-world resource allocation problem to solve
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
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
                    <div className="surface-elevated rounded-xl p-6 mb-8">
                      <h3 className="font-display font-semibold text-foreground mb-4">
                        Coalition Values
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4">
                        Each coalition&apos;s value represents how much they can achieve together.
                        The Shapley Value fairly distributes the grand coalition&apos;s total value.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {selectedScenario.coalitionValues.map((cv, i) => (
                          <div
                            key={i}
                            className="bg-muted rounded-lg px-3 py-2"
                          >
                            <div className="font-mono text-xs text-muted-foreground">
                              &#123;{cv.coalition.join(", ")}&#125;
                            </div>
                            <div className="font-mono text-sm font-semibold text-foreground">
                              {cv.value.toLocaleString()} {selectedScenario.resourceUnit}
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

              {results && selectedScenario && (
                <AllocationResults
                  results={results}
                  totalResource={selectedScenario.totalResource}
                  resourceUnit={selectedScenario.resourceUnit}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container max-w-5xl mx-auto px-6 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            Based on the Shapley Value — Lloyd Shapley, Nobel Memorial Prize in Economics 2012
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
