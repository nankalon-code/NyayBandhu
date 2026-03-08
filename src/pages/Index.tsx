import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AboutSection } from "@/components/AboutSection";
import { BudgetAllocator } from "@/components/BudgetAllocator";
import { ContributeSection } from "@/components/ContributeSection";
import { NewsBoard } from "@/components/NewsBoard";
import { Moon, Sun, Scale } from "lucide-react";
import { FloatingParticles } from "@/components/FloatingParticles";
import { PolkaDots } from "@/components/PolkaDots";
import { ScrollProgress } from "@/components/ScrollProgress";
import { GradientDivider } from "@/components/GradientDivider";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "allocator", label: "Allocator" },
  { id: "report", label: "Reports" },
  { id: "contribute", label: "Contribute" },
];

const Index = () => {
  const [darkMode, setDarkMode] = useState(true);

  // Start in dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  const [activeSection, setActiveSection] = useState("about");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollY) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <ScrollProgress />
      <FloatingParticles />
      <PolkaDots />

      {/* Glass Navigation */}
      <nav className="fixed top-[2px] left-0 right-0 z-50 glass-nav">
        <div className="container max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left nav items */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.slice(0, 2).map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-4 py-2 rounded-full text-sm font-display font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-primary/10 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Center logo */}
          <motion.button
            onClick={() => scrollTo("about")}
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <Scale className="w-4.5 h-4.5 text-primary" />
            </div>
            <div className="text-center">
              <span className="font-display font-bold text-foreground text-lg tracking-tight block leading-none">
                NyayBandhu
              </span>
              <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">
                Fair Allocation
              </span>
            </div>
          </motion.button>

          {/* Right nav items + dark mode */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.slice(2).map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-display font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </motion.button>
            ))}
            <div className="w-px h-5 bg-border/50 mx-2" />
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-full border border-border/50 bg-card/50 hover:bg-muted/80 transition-all text-foreground"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
          </div>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: 15 }}
              className="p-2.5 rounded-full border border-border/50 bg-card/50 hover:bg-muted transition-all text-foreground"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile bottom nav */}
        <div className="md:hidden border-t border-border/30 px-4 py-2 flex justify-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-display font-medium transition-all ${
                activeSection === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="relative pt-28 md:pt-24">
        <section id="about" className="scroll-mt-24">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-20">
            <AboutSection />
          </div>
        </section>

        <GradientDivider />

        <section id="allocator" className="scroll-mt-24">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-20">
            <BudgetAllocator />
          </div>
        </section>

        <GradientDivider />

        <section id="report" className="scroll-mt-24">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-20">
            <NewsBoard />
          </div>
        </section>

        <GradientDivider />

        <section id="contribute" className="scroll-mt-24">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-20">
            <ContributeSection />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8">
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
