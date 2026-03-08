import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  location: string;
  category: string;
  detail: string;
  severity?: "high" | "medium" | "low";
  date: string;
}

const IMPROVEMENT_NEWS: NewsItem[] = [
  { id: "n1", title: "Open defecation persists in rural pockets", location: "Bihar", category: "Cleanliness", detail: "Swachh Bharat coverage at only 35% in rural Bihar. 12 districts report less than 25% toilet usage despite construction targets being met.", severity: "high", date: "Mar 2026" },
  { id: "n2", title: "Teacher vacancies at critical levels", location: "Uttar Pradesh", category: "Education", detail: "Over 1.5 lakh primary teacher positions remain vacant. Student-teacher ratio exceeds 60:1 in 8 districts.", severity: "high", date: "Mar 2026" },
  { id: "n3", title: "PHC facilities lack basic equipment", location: "Jharkhand", category: "Health", detail: "42% of Primary Health Centres operate without X-ray machines. Blood testing facilities absent in 30% of sub-centres.", severity: "high", date: "Feb 2026" },
  { id: "n4", title: "Waste processing plants non-functional", location: "Odisha", category: "Cleanliness", detail: "6 out of 10 solid waste processing plants built under Swachh Bharat are non-operational due to maintenance issues.", severity: "medium", date: "Feb 2026" },
  { id: "n5", title: "Mid-day meal quality complaints surge", location: "Rajasthan", category: "Education", detail: "Reports of substandard food in 200+ government schools. Nutritional standards not being met in 15 districts.", severity: "medium", date: "Mar 2026" },
  { id: "n6", title: "MGNREGA wage delays exceed 30 days", location: "West Bengal", category: "Rural", detail: "Payment delays affecting 4.2 lakh workers. Average delay period has increased from 15 to 34 days over 6 months.", severity: "high", date: "Mar 2026" },
  { id: "n7", title: "Housing scheme beneficiaries lack sanitation", location: "Chhattisgarh", category: "Housing", detail: "28% of PM Awas Yojana houses completed without attached toilet facilities, defeating Swachh Bharat integration goals.", severity: "medium", date: "Feb 2026" },
  { id: "n8", title: "Drinking water contamination reported", location: "Assam", category: "Health", detail: "Arsenic levels above WHO limits found in 340 habitations across 5 districts. Water treatment plants pending for 2+ years.", severity: "high", date: "Mar 2026" },
];

const GOOD_NEWS: NewsItem[] = [
  { id: "g1", title: "Indore retains cleanest city title for 7th year", location: "Madhya Pradesh", category: "Cleanliness", detail: "100% door-to-door waste collection, 95% waste processing rate. Model being replicated across 15 other cities.", date: "Mar 2026" },
  { id: "g2", title: "Kerala achieves 99% school enrollment", location: "Kerala", category: "Education", detail: "Digital classroom initiative reaches all 14 districts. Dropout rate reduced to 0.3%, lowest in the country.", date: "Mar 2026" },
  { id: "g3", title: "Tamil Nadu's health insurance covers 2.1 Cr families", location: "Tamil Nadu", category: "Health", detail: "Chief Minister's Comprehensive Health Insurance scheme integrated with Ayushman Bharat. Free treatment in 1,200 hospitals.", date: "Feb 2026" },
  { id: "g4", title: "Gujarat builds 12 lakh toilets ahead of schedule", location: "Gujarat", category: "Cleanliness", detail: "State exceeds Swachh Bharat targets by 18%. Community-led sanitation campaigns drive sustained usage at 92%.", date: "Mar 2026" },
  { id: "g5", title: "Sikkim becomes fully organic farming state", location: "Sikkim", category: "Rural", detail: "All 75,000 hectares of farmland certified organic. Farm income increased by 30% through premium pricing and eco-tourism.", date: "Feb 2026" },
  { id: "g6", title: "Mizoram literacy rate crosses 93%", location: "Mizoram", category: "Education", detail: "Community-driven adult education programme reduces illiteracy to under 7%. Digital literacy centres in every village.", date: "Mar 2026" },
  { id: "g7", title: "Karnataka's telemedicine reaches 5,000 villages", location: "Karnataka", category: "Health", detail: "E-Sanjeevani platform handles 50,000 consultations monthly. Specialist access improved by 300% in rural areas.", date: "Feb 2026" },
  { id: "g8", title: "Maharashtra MGNREGA creates durable assets", location: "Maharashtra", category: "Rural", detail: "Water conservation structures built under MGNREGA increase groundwater by 15% in drought-prone Marathwada region.", date: "Mar 2026" },
];

function SeverityBadge({ severity }: { severity?: string }) {
  if (!severity) return null;
  const styles = {
    high: "bg-destructive/10 text-destructive border-destructive/20",
    medium: "bg-accent/10 text-accent-foreground border-accent/20",
    low: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${styles[severity as keyof typeof styles] || styles.low}`}>
      {severity.toUpperCase()}
    </span>
  );
}

function NewsCard({ item, variant }: { item: NewsItem; variant: "alert" | "positive" }) {
  return (
    <div className={`p-4 rounded-xl border transition-all hover:shadow-md ${
      variant === "alert" 
        ? "bg-card border-destructive/10 hover:border-destructive/25" 
        : "bg-card border-primary/10 hover:border-primary/25"
    }`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          {variant === "alert" 
            ? <ArrowDownRight className="w-4 h-4 text-destructive shrink-0" />
            : <ArrowUpRight className="w-4 h-4 text-primary shrink-0" />
          }
          <span className="font-mono text-[10px] text-muted-foreground">{item.category}</span>
        </div>
        <div className="flex items-center gap-2">
          <SeverityBadge severity={item.severity} />
          <span className="font-mono text-[10px] text-muted-foreground">{item.date}</span>
        </div>
      </div>
      <h4 className="font-display font-semibold text-sm text-foreground mb-1 leading-tight">{item.title}</h4>
      <p className="font-mono text-[11px] text-primary font-medium mb-2">{item.location}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
    </div>
  );
}

export function NewsBoard() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">Ground Reports</h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Real-time intelligence from across India — areas needing attention and success stories worth replicating
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Needs Improvement */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-destructive/15">
            <div className="p-2 rounded-lg bg-destructive/10">
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">Needs Attention</h3>
              <p className="text-xs text-muted-foreground">Areas requiring immediate resource allocation</p>
            </div>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {IMPROVEMENT_NEWS.map((item) => (
              <NewsCard key={item.id} item={item} variant="alert" />
            ))}
          </div>
        </motion.div>

        {/* Good News */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-primary/15">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">Success Stories</h3>
              <p className="text-xs text-muted-foreground">Models of efficiency worth training on</p>
            </div>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {GOOD_NEWS.map((item) => (
              <NewsCard key={item.id} item={item} variant="positive" />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
