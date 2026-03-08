import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AboutSection } from "@/components/AboutSection";
import { BudgetAllocator } from "@/components/BudgetAllocator";
import { ContributeSection } from "@/components/ContributeSection";
import { NewsBoard } from "@/components/NewsBoard";
import { Moon, Sun, Scale } from "lucide-react";
import { FloatingParticles } from "@/components/FloatingParticles";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "allocator", label: "Allocator" },
  { id: "report", label: "Reports" },
  { id: "contribute", label: "Contribute" },
];

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
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
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-60 -right-60 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]" />
        <div className="absolute -bottom-40 right-1/3 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[80px]" />
      </div>

      {/* Glass Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="container max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left nav items */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.slice(0, 2).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-display font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Center logo */}
          <button onClick={() => scrollTo("about")} className="flex items-center gap-2.5 group">
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
          </button>

          {/* Right nav items + dark mode */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.slice(2).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-display font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="w-px h-5 bg-border/50 mx-2" />
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full border border-border/50 bg-card/50 hover:bg-muted/80 transition-all text-foreground"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full border border-border/50 bg-card/50 hover:bg-muted transition-all text-foreground"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
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
        {/* About Section */}
        <section id="about" className="scroll-mt-24">
          <div className="container max-w-6xl mx-auto px-6 py-16 md:py-24">
            <AboutSection />
          </div>
        </section>

        {/* Divider */}
        <div className="container max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Allocator Section */}
        <section id="allocator" className="scroll-mt-24">
          <div className="container max-w-6xl mx-auto px-6 py-16 md:py-24">
            <BudgetAllocator />
          </div>
        </section>

        <div className="container max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Reports Section */}
        <section id="report" className="scroll-mt-24">
          <div className="container max-w-6xl mx-auto px-6 py-16 md:py-24">
            <NewsBoard />
          </div>
        </section>

        <div className="container max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Contribute Section */}
        <section id="contribute" className="scroll-mt-24">
          <div className="container max-w-6xl mx-auto px-6 py-16 md:py-24">
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
