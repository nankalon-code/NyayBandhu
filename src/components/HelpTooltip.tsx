import { useState } from "react";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HelpTooltipProps {
  term: string;
  explanation: string;
}

const GLOSSARY: Record<string, string> = {
  "shapley-value":
    "A mathematically proven method to fairly distribute a total value among participants based on their marginal contributions across all possible coalitions.",
  "coalition":
    "A group of states working together. The engine evaluates every possible grouping to determine fair shares.",
  "marginal-contribution":
    "How much extra value a state adds when it joins a coalition. States that add more, get more.",
  "fairness-axioms":
    "Four mathematical rules (Efficiency, Symmetry, Null Player, Additivity) that guarantee the allocation is uniquely fair.",
  "synergy-bonus":
    "Extra value generated when states collaborate — e.g., knowledge transfer between high and low performing states.",
  "baseline-value":
    "The standalone worth of a single state, calculated from its population and development metrics.",
};

export function HelpTooltip({ term, explanation }: HelpTooltipProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center gap-1 text-primary/70 hover:text-primary transition-colors">
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-xs bg-card border border-border shadow-lg rounded-xl p-3"
        >
          <p className="font-display font-semibold text-xs text-foreground mb-1">{term}</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">{explanation}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function GlossaryTooltip({ id }: { id: keyof typeof GLOSSARY }) {
  const names: Record<string, string> = {
    "shapley-value": "Shapley Value",
    "coalition": "Coalition",
    "marginal-contribution": "Marginal Contribution",
    "fairness-axioms": "Fairness Axioms",
    "synergy-bonus": "Synergy Bonus",
    "baseline-value": "Baseline Value",
  };
  return <HelpTooltip term={names[id] || id} explanation={GLOSSARY[id] || ""} />;
}
