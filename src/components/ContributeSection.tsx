import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Github, Mail, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function ContributeSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Message sent!", description: "Thank you for your contribution idea. We'll review it soon." });
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">Contribute</h2>
        <p className="text-sm text-muted-foreground">
          Have ideas to improve NyayBandhu? Share your thoughts on new fairness models, 
          data sources, or government schemes to include.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="surface-elevated rounded-xl p-6 border border-border/50 space-y-4">
            <h3 className="font-display font-semibold text-foreground mb-2">Share Your Ideas</h3>
            <div>
              <label className="text-xs font-display font-medium text-muted-foreground mb-1 block">Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" maxLength={100} />
            </div>
            <div>
              <label className="text-xs font-display font-medium text-muted-foreground mb-1 block">Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" type="email" maxLength={255} />
            </div>
            <div>
              <label className="text-xs font-display font-medium text-muted-foreground mb-1 block">Your Idea / Feedback</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your idea — new fairness model, data correction, feature request..."
                rows={5}
                maxLength={1000}
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display">
              <Send className="w-4 h-4 mr-2" /> Send Message
            </Button>
          </form>
        </motion.div>

        {/* Ways to contribute */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="font-display font-semibold text-foreground">Ways to Contribute</h3>

          {[
            {
              icon: <MessageSquare className="w-5 h-5 text-primary" />,
              title: "Suggest New Scenarios",
              desc: "Propose real-world allocation problems from Indian governance — GST revenue sharing, railway budget, NITI Aayog index-based allocation.",
            },
            {
              icon: <Github className="w-5 h-5 text-foreground" />,
              title: "Improve the Model",
              desc: "Suggest better synergy formulas, coalition value functions, or alternative fairness criteria beyond Shapley.",
            },
            {
              icon: <Mail className="w-5 h-5 text-accent" />,
              title: "Report Data Issues",
              desc: "If state statistics, scheme coverage, or budget figures are outdated, let us know with correct sources.",
            },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl border border-border bg-card flex gap-4">
              <div className="shrink-0 mt-0.5">{item.icon}</div>
              <div>
                <h4 className="font-display font-semibold text-sm text-foreground mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
