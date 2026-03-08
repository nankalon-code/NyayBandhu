import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  label: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-2xl mx-auto mb-8">
      {steps.map((step, i) => {
        const isComplete = i < currentStep;
        const isActive = i === currentStep;
        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 relative">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isComplete
                    ? "hsl(var(--primary))"
                    : isActive
                    ? "hsl(var(--primary) / 0.15)"
                    : "hsl(var(--muted))",
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors"
                style={{
                  borderColor: isComplete || isActive
                    ? "hsl(var(--primary))"
                    : "hsl(var(--border))",
                }}
              >
                {isComplete ? (
                  <Check className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                )}
              </motion.div>
              <div className="text-center absolute top-10 w-20">
                <p
                  className={`text-[10px] font-display font-medium leading-tight ${
                    isActive ? "text-primary" : isComplete ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-px mx-2 relative">
                <div className="absolute inset-0 bg-border" />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isComplete ? 1 : 0 }}
                  className="absolute inset-0 bg-primary origin-left"
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
