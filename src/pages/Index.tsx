import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AboutSection } from "@/components/AboutSection";
import { BudgetAllocator } from "@/components/BudgetAllocator";
import { ContributeSection } from "@/components/ContributeSection";
import { NewsBoard } from "@/components/NewsBoard";
import { Moon, Sun, Scale, IndianRupee, Users, Newspaper } from "lucide-react";

type Section = "about" | "allocator" | "contribute" | "report";

const NAV_ITEMS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "about", label: "About", icon: <Scale className="w-4 h-4" /> },
  { id: "allocator", label: "Allocator", icon: <IndianRupee className="w-4 h-4" /> },
  { id: "contribute", label: "Contribute", icon: <Users className="w-4 h-4" /> },
  { id: "report", label: "Report", icon: <Newspaper className="w-4 h-4" /> },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>("about");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Decorative bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Top bar */}
      <div className="relative border-b border-border/50">
        <div className="container max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Scale className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-bold text-foreground text-lg tracking-tight">NyayBandhu</span>
            <span className="font-mono text-[10px] text-muted-foreground hidden sm:inline">v2.0</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-foreground"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="relative border-b border-border/50 bg-card/50 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 px-4 py-3 font-display font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeSection === item.id
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative container max-w-6xl mx-auto px-6 py-10 md:py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {activeSection === "about" && <AboutSection />}
            {activeSection === "allocator" && <BudgetAllocator />}
            {activeSection === "contribute" && <ContributeSection />}
            {activeSection === "report" && <NewsBoard />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6">
        <div className="container max-w-6xl mx-auto px-6 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            NyayBandhu — Fair allocation powered by Shapley Values — 29 States, 5+ Schemes
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
