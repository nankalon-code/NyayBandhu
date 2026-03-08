// Location-based data for Indian states/regions with gov scheme metrics
// Includes cleanliness (Swachh Bharat), education, healthcare, disaster readiness

export interface StateData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  population: number; // in lakhs
  schemes: GovScheme[];
  cleanlinessScore: number; // 0-100 (Swachh Survekshan inspired)
  literacyRate: number; // percentage
  healthIndex: number; // 0-100
}

export interface GovScheme {
  name: string;
  category: "cleanliness" | "education" | "health" | "rural" | "housing";
  budget: number; // in crores
  coverage: number; // percentage of eligible population covered
}

export interface RegionGroup {
  id: string;
  name: string;
  description: string;
  states: string[]; // state IDs
}

export const INDIAN_STATES: StateData[] = [
  {
    id: "delhi",
    name: "Delhi",
    lat: 28.6139,
    lng: 77.209,
    population: 200,
    cleanlinessScore: 62,
    literacyRate: 88.7,
    healthIndex: 72,
    schemes: [
      { name: "Swachh Bharat Mission", category: "cleanliness", budget: 180, coverage: 68 },
      { name: "Ayushman Bharat", category: "health", budget: 320, coverage: 45 },
      { name: "PM Awas Yojana", category: "housing", budget: 250, coverage: 38 },
    ],
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    lat: 19.7515,
    lng: 75.7139,
    population: 1240,
    cleanlinessScore: 58,
    literacyRate: 84.8,
    healthIndex: 65,
    schemes: [
      { name: "Swachh Bharat Mission", category: "cleanliness", budget: 950, coverage: 55 },
      { name: "Samagra Shiksha", category: "education", budget: 1200, coverage: 72 },
      { name: "Ayushman Bharat", category: "health", budget: 800, coverage: 40 },
      { name: "MGNREGA", category: "rural", budget: 1500, coverage: 60 },
    ],
  },
  {
    id: "up",
    name: "Uttar Pradesh",
    lat: 26.8467,
    lng: 80.9462,
    population: 2350,
    cleanlinessScore: 38,
    literacyRate: 73.0,
    healthIndex: 42,
    schemes: [
      { name: "Swachh Bharat Mission", category: "cleanliness", budget: 2200, coverage: 42 },
      { name: "Samagra Shiksha", category: "education", budget: 3500, coverage: 58 },
      { name: "Ayushman Bharat", category: "health", budget: 1800, coverage: 35 },
      { name: "PM Awas Yojana", category: "housing", budget: 2800, coverage: 30 },
      { name: "MGNREGA", category: "rural", budget: 4200, coverage: 55 },
    ],
  },
  {
    id: "bihar",
    name: "Bihar",
    lat: 25.0961,
    lng: 85.3131,
    population: 1280,
    cleanlinessScore: 28,
    literacyRate: 70.9,
    healthIndex: 35,
    schemes: [
      { name: "Swachh Bharat Mission", category: "cleanliness", budget: 1500, coverage: 35 },
      { name: "Samagra Shiksha", category: "education", budget: 2800, coverage: 50 },
      { name: "Ayushman Bharat", category: "health", budget: 1200, coverage: 30 },
      { name: "MGNREGA", category: "rural", budget: 3800, coverage: 62 },
    ],
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    lat: 27.0238,
    lng: 74.2179,
    population: 810,
    cleanlinessScore: 42,
    literacyRate: 69.7,
    healthIndex: 48,
    schemes: [
      { name: "Swachh Bharat Mission", category: "cleanliness", budget: 980, coverage: 48 },
      { name: "Samagra Shiksha", category: "education", budget: 1600, coverage: 55 },
      { name: "Ayushman Bharat", category: "health", budget: 700, coverage: 38 },
      { name: "MGNREGA", category: "rural", budget: 2500, coverage: 65 },
    ],
  },
  {
    id: "kerala",
    name: "Kerala",
    lat: 10.8505,
    lng: 76.2711,
    population: 350,
    cleanlinessScore: 78,
    literacyRate: 96.2,
    healthIndex: 85,
    schemes: [
      { name: "Swachh Bharat Mission", category: "cleanliness", budget: 280, coverage: 82 },
      { name: "Samagra Shiksha", category: "education", budget: 450, coverage: 90 },
      { name: "Ayushman Bharat", category: "health", budget: 350, coverage: 65 },
    ],
  },
  {
    id: "tamilnadu",
    name: "Tamil Nadu",
    lat: 11.1271,
    lng: 78.6569,
    population: 770,
    cleanlinessScore: 65,
    literacyRate: 82.9,
    healthIndex: 70,
    schemes: [
      { name: "Swachh Bharat Mission", category: "cleanliness", budget: 620, coverage: 65 },
      { name: "Samagra Shiksha", category: "education", budget: 900, coverage: 78 },
      { name: "Ayushman Bharat", category: "health", budget: 600, coverage: 50 },
      { name: "MGNREGA", category: "rural", budget: 1800, coverage: 70 },
    ],
  },
  {
    id: "karnataka",
    name: "Karnataka",
    lat: 15.3173,
    lng: 75.7139,
    population: 680,
    cleanlinessScore: 60,
    literacyRate: 77.2,
    healthIndex: 62,
    schemes: [
      { name: "Swachh Bharat Mission", category: "cleanliness", budget: 550, coverage: 58 },
      { name: "Samagra Shiksha", category: "education", budget: 800, coverage: 70 },
      { name: "Ayushman Bharat", category: "health", budget: 500, coverage: 42 },
      { name: "MGNREGA", category: "rural", budget: 1400, coverage: 58 },
    ],
  },
  {
    id: "wb",
    name: "West Bengal",
    lat: 22.9868,
    lng: 87.855,
    population: 1010,
    cleanlinessScore: 35,
    literacyRate: 77.1,
    healthIndex: 50,
    schemes: [
      { name: "Swachh Bharat Mission", category: "cleanliness", budget: 800, coverage: 40 },
      { name: "Samagra Shiksha", category: "education", budget: 1100, coverage: 62 },
      { name: "Ayushman Bharat", category: "health", budget: 650, coverage: 32 },
      { name: "MGNREGA", category: "rural", budget: 2200, coverage: 58 },
    ],
  },
  {
    id: "mp",
    name: "Madhya Pradesh",
    lat: 22.9734,
    lng: 78.6569,
    population: 850,
    cleanlinessScore: 55,
    literacyRate: 73.7,
    healthIndex: 45,
    schemes: [
      { name: "Swachh Bharat Mission", category: "cleanliness", budget: 900, coverage: 52 },
      { name: "Samagra Shiksha", category: "education", budget: 1300, coverage: 58 },
      { name: "Ayushman Bharat", category: "health", budget: 700, coverage: 38 },
      { name: "MGNREGA", category: "rural", budget: 2800, coverage: 68 },
      { name: "PM Awas Yojana", category: "housing", budget: 1800, coverage: 35 },
    ],
  },
];

export const REGION_GROUPS: RegionGroup[] = [
  {
    id: "north",
    name: "North India",
    description: "UP, Bihar, Rajasthan — High population, lower development indices",
    states: ["up", "bihar", "rajasthan", "delhi"],
  },
  {
    id: "south",
    name: "South India",
    description: "Kerala, Tamil Nadu, Karnataka — Higher literacy and health indices",
    states: ["kerala", "tamilnadu", "karnataka"],
  },
  {
    id: "west",
    name: "West India",
    description: "Maharashtra, Madhya Pradesh — Mixed development indicators",
    states: ["maharashtra", "mp"],
  },
  {
    id: "east",
    name: "East India",
    description: "West Bengal, Bihar — Focus on rural development",
    states: ["wb", "bihar"],
  },
];

// Generate Shapley-compatible scenario from selected states
export function generateLocationScenario(
  selectedStateIds: string[],
  category: "cleanliness" | "education" | "health" | "overall"
) {
  const COLORS = [
    "hsl(172, 50%, 28%)",
    "hsl(42, 90%, 55%)",
    "hsl(12, 80%, 60%)",
    "hsl(230, 60%, 55%)",
    "hsl(160, 50%, 35%)",
    "hsl(290, 50%, 50%)",
  ];

  const states = selectedStateIds
    .map((id) => INDIAN_STATES.find((s) => s.id === id))
    .filter(Boolean) as StateData[];

  if (states.length < 2) return null;

  // Calculate standalone value based on category
  function getStateValue(state: StateData): number {
    switch (category) {
      case "cleanliness":
        return state.cleanlinessScore * state.population * 0.1;
      case "education":
        return state.literacyRate * state.population * 0.1;
      case "health":
        return state.healthIndex * state.population * 0.1;
      case "overall":
        return (
          (state.cleanlinessScore * 0.3 +
            state.literacyRate * 0.35 +
            state.healthIndex * 0.35) *
          state.population *
          0.1
        );
    }
  }

  // Generate coalition values with synergy bonuses
  function getCoalitionSynergy(coalition: StateData[]): number {
    const baseSum = coalition.reduce((sum, s) => sum + getStateValue(s), 0);
    // Synergy: more diverse coalitions get bonus
    const diversityBonus = coalition.length > 1 ? 1 + (coalition.length - 1) * 0.15 : 1;
    // Cleanliness bonus: states with low scores benefit more from collaboration
    const cleanlinessSpread =
      category === "cleanliness" || category === "overall"
        ? Math.max(...coalition.map((s) => s.cleanlinessScore)) -
          Math.min(...coalition.map((s) => s.cleanlinessScore))
        : 0;
    const knowledgeTransfer = 1 + cleanlinessSpread * 0.003;
    return Math.round(baseSum * diversityBonus * knowledgeTransfer);
  }

  // Generate all coalitions
  function getAllSubsets(arr: StateData[]): StateData[][] {
    const subsets: StateData[][] = [];
    for (let i = 1; i < 2 ** arr.length; i++) {
      const subset: StateData[] = [];
      for (let j = 0; j < arr.length; j++) {
        if (i & (1 << j)) subset.push(arr[j]);
      }
      subsets.push(subset);
    }
    return subsets;
  }

  const allCoalitions = getAllSubsets(states);
  const totalValue = getCoalitionSynergy(states);

  const categoryLabels = {
    cleanliness: "Swachh Bharat",
    education: "Samagra Shiksha",
    health: "Ayushman Bharat",
    overall: "Composite Index",
  };

  return {
    id: `location-${category}`,
    name: `${categoryLabels[category]} — Regional Fair Allocation`,
    description: `Fair distribution of ₹${(totalValue * 100).toLocaleString("en-IN")} across ${states.length} states for ${categoryLabels[category]} programme.`,
    icon: category === "cleanliness" ? "🧹" : category === "education" ? "📚" : category === "health" ? "🏥" : "🇮🇳",
    totalResource: totalValue,
    resourceUnit: "₹",
    players: states.map((s, i) => ({
      id: s.id,
      name: s.name,
      color: COLORS[i % COLORS.length],
    })),
    coalitionValues: allCoalitions.map((coalition) => ({
      coalition: coalition.map((s) => s.id),
      value: getCoalitionSynergy(coalition),
    })),
  };
}

export function getCategoryIcon(cat: string) {
  switch (cat) {
    case "cleanliness": return "🧹";
    case "education": return "📚";
    case "health": return "🏥";
    case "rural": return "🌾";
    case "housing": return "🏠";
    default: return "📋";
  }
}
