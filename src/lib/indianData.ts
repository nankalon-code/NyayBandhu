export interface StateData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  population: number;
  schemes: GovScheme[];
  cleanlinessScore: number;
  literacyRate: number;
  healthIndex: number;
}

export interface GovScheme {
  name: string;
  category: "cleanliness" | "education" | "health" | "rural" | "housing";
  budget: number;
  coverage: number;
}

export interface RegionGroup {
  id: string;
  name: string;
  description: string;
  states: string[];
}

export const INDIAN_STATES: StateData[] = [
  {
    id: "andhra", name: "Andhra Pradesh", lat: 15.9129, lng: 79.74,
    population: 530, cleanlinessScore: 52, literacyRate: 67.4, healthIndex: 55,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 420, coverage: 50 },
      { name: "Samagra Shiksha", category: "education", budget: 680, coverage: 62 },
      { name: "Ayushman Bharat", category: "health", budget: 450, coverage: 42 },
    ],
  },
  {
    id: "arunachal", name: "Arunachal Pradesh", lat: 28.218, lng: 94.7278,
    population: 16, cleanlinessScore: 45, literacyRate: 66.95, healthIndex: 40,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 15, coverage: 42 },
      { name: "Samagra Shiksha", category: "education", budget: 30, coverage: 55 },
    ],
  },
  {
    id: "assam", name: "Assam", lat: 26.2006, lng: 92.9376,
    population: 350, cleanlinessScore: 35, literacyRate: 73.18, healthIndex: 42,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 280, coverage: 38 },
      { name: "Samagra Shiksha", category: "education", budget: 500, coverage: 58 },
      { name: "Ayushman Bharat", category: "health", budget: 320, coverage: 35 },
      { name: "MGNREGA", category: "rural", budget: 900, coverage: 60 },
    ],
  },
  {
    id: "bihar", name: "Bihar", lat: 25.0961, lng: 85.3131,
    population: 1280, cleanlinessScore: 28, literacyRate: 70.9, healthIndex: 35,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 1500, coverage: 35 },
      { name: "Samagra Shiksha", category: "education", budget: 2800, coverage: 50 },
      { name: "Ayushman Bharat", category: "health", budget: 1200, coverage: 30 },
      { name: "MGNREGA", category: "rural", budget: 3800, coverage: 62 },
    ],
  },
  {
    id: "chhattisgarh", name: "Chhattisgarh", lat: 21.2787, lng: 81.8661,
    population: 290, cleanlinessScore: 40, literacyRate: 71.04, healthIndex: 44,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 240, coverage: 42 },
      { name: "Samagra Shiksha", category: "education", budget: 400, coverage: 55 },
      { name: "MGNREGA", category: "rural", budget: 800, coverage: 65 },
    ],
  },
  {
    id: "goa", name: "Goa", lat: 15.2993, lng: 74.124,
    population: 16, cleanlinessScore: 72, literacyRate: 88.7, healthIndex: 78,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 12, coverage: 75 },
      { name: "Ayushman Bharat", category: "health", budget: 15, coverage: 60 },
    ],
  },
  {
    id: "gujarat", name: "Gujarat", lat: 22.2587, lng: 71.1924,
    population: 680, cleanlinessScore: 68, literacyRate: 79.31, healthIndex: 65,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 550, coverage: 65 },
      { name: "Samagra Shiksha", category: "education", budget: 800, coverage: 72 },
      { name: "Ayushman Bharat", category: "health", budget: 500, coverage: 48 },
      { name: "PM Awas Yojana", category: "housing", budget: 900, coverage: 40 },
    ],
  },
  {
    id: "haryana", name: "Haryana", lat: 29.0588, lng: 76.0856,
    population: 290, cleanlinessScore: 55, literacyRate: 76.64, healthIndex: 58,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 230, coverage: 55 },
      { name: "Samagra Shiksha", category: "education", budget: 350, coverage: 65 },
      { name: "Ayushman Bharat", category: "health", budget: 220, coverage: 45 },
    ],
  },
  {
    id: "hp", name: "Himachal Pradesh", lat: 31.1048, lng: 77.1734,
    population: 75, cleanlinessScore: 65, literacyRate: 83.78, healthIndex: 72,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 60, coverage: 68 },
      { name: "Samagra Shiksha", category: "education", budget: 100, coverage: 80 },
    ],
  },
  {
    id: "jharkhand", name: "Jharkhand", lat: 23.6102, lng: 85.2799,
    population: 390, cleanlinessScore: 32, literacyRate: 67.63, healthIndex: 38,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 350, coverage: 35 },
      { name: "Samagra Shiksha", category: "education", budget: 550, coverage: 52 },
      { name: "MGNREGA", category: "rural", budget: 1100, coverage: 58 },
    ],
  },
  {
    id: "karnataka", name: "Karnataka", lat: 15.3173, lng: 75.7139,
    population: 680, cleanlinessScore: 60, literacyRate: 77.2, healthIndex: 62,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 550, coverage: 58 },
      { name: "Samagra Shiksha", category: "education", budget: 800, coverage: 70 },
      { name: "Ayushman Bharat", category: "health", budget: 500, coverage: 42 },
      { name: "MGNREGA", category: "rural", budget: 1400, coverage: 58 },
    ],
  },
  {
    id: "kerala", name: "Kerala", lat: 10.8505, lng: 76.2711,
    population: 350, cleanlinessScore: 78, literacyRate: 96.2, healthIndex: 85,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 280, coverage: 82 },
      { name: "Samagra Shiksha", category: "education", budget: 450, coverage: 90 },
      { name: "Ayushman Bharat", category: "health", budget: 350, coverage: 65 },
    ],
  },
  {
    id: "mp", name: "Madhya Pradesh", lat: 22.9734, lng: 78.6569,
    population: 850, cleanlinessScore: 55, literacyRate: 73.7, healthIndex: 45,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 900, coverage: 52 },
      { name: "Samagra Shiksha", category: "education", budget: 1300, coverage: 58 },
      { name: "Ayushman Bharat", category: "health", budget: 700, coverage: 38 },
      { name: "MGNREGA", category: "rural", budget: 2800, coverage: 68 },
      { name: "PM Awas Yojana", category: "housing", budget: 1800, coverage: 35 },
    ],
  },
  {
    id: "maharashtra", name: "Maharashtra", lat: 19.7515, lng: 75.7139,
    population: 1240, cleanlinessScore: 58, literacyRate: 84.8, healthIndex: 65,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 950, coverage: 55 },
      { name: "Samagra Shiksha", category: "education", budget: 1200, coverage: 72 },
      { name: "Ayushman Bharat", category: "health", budget: 800, coverage: 40 },
      { name: "MGNREGA", category: "rural", budget: 1500, coverage: 60 },
    ],
  },
  {
    id: "manipur", name: "Manipur", lat: 24.6637, lng: 93.9063,
    population: 31, cleanlinessScore: 38, literacyRate: 79.85, healthIndex: 45,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 25, coverage: 40 },
      { name: "Samagra Shiksha", category: "education", budget: 45, coverage: 60 },
    ],
  },
  {
    id: "meghalaya", name: "Meghalaya", lat: 25.467, lng: 91.3662,
    population: 35, cleanlinessScore: 42, literacyRate: 75.48, healthIndex: 48,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 28, coverage: 42 },
      { name: "Samagra Shiksha", category: "education", budget: 50, coverage: 58 },
    ],
  },
  {
    id: "mizoram", name: "Mizoram", lat: 23.1645, lng: 92.9376,
    population: 12, cleanlinessScore: 70, literacyRate: 91.58, healthIndex: 68,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 10, coverage: 72 },
      { name: "Samagra Shiksha", category: "education", budget: 18, coverage: 85 },
    ],
  },
  {
    id: "nagaland", name: "Nagaland", lat: 26.1584, lng: 94.5624,
    population: 22, cleanlinessScore: 44, literacyRate: 80.11, healthIndex: 50,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 18, coverage: 45 },
      { name: "Samagra Shiksha", category: "education", budget: 32, coverage: 62 },
    ],
  },
  {
    id: "odisha", name: "Odisha", lat: 20.9517, lng: 85.0985,
    population: 460, cleanlinessScore: 38, literacyRate: 73.45, healthIndex: 42,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 380, coverage: 40 },
      { name: "Samagra Shiksha", category: "education", budget: 600, coverage: 58 },
      { name: "Ayushman Bharat", category: "health", budget: 380, coverage: 35 },
      { name: "MGNREGA", category: "rural", budget: 1200, coverage: 65 },
    ],
  },
  {
    id: "punjab", name: "Punjab", lat: 31.1471, lng: 75.3412,
    population: 310, cleanlinessScore: 58, literacyRate: 76.68, healthIndex: 62,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 250, coverage: 58 },
      { name: "Samagra Shiksha", category: "education", budget: 380, coverage: 68 },
      { name: "Ayushman Bharat", category: "health", budget: 260, coverage: 48 },
    ],
  },
  {
    id: "rajasthan", name: "Rajasthan", lat: 27.0238, lng: 74.2179,
    population: 810, cleanlinessScore: 42, literacyRate: 69.7, healthIndex: 48,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 980, coverage: 48 },
      { name: "Samagra Shiksha", category: "education", budget: 1600, coverage: 55 },
      { name: "Ayushman Bharat", category: "health", budget: 700, coverage: 38 },
      { name: "MGNREGA", category: "rural", budget: 2500, coverage: 65 },
    ],
  },
  {
    id: "sikkim", name: "Sikkim", lat: 27.533, lng: 88.5122,
    population: 7, cleanlinessScore: 68, literacyRate: 82.2, healthIndex: 70,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 6, coverage: 70 },
      { name: "Samagra Shiksha", category: "education", budget: 10, coverage: 78 },
    ],
  },
  {
    id: "tamilnadu", name: "Tamil Nadu", lat: 11.1271, lng: 78.6569,
    population: 770, cleanlinessScore: 65, literacyRate: 82.9, healthIndex: 70,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 620, coverage: 65 },
      { name: "Samagra Shiksha", category: "education", budget: 900, coverage: 78 },
      { name: "Ayushman Bharat", category: "health", budget: 600, coverage: 50 },
      { name: "MGNREGA", category: "rural", budget: 1800, coverage: 70 },
    ],
  },
  {
    id: "telangana", name: "Telangana", lat: 18.1124, lng: 79.0193,
    population: 380, cleanlinessScore: 58, literacyRate: 72.8, healthIndex: 58,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 300, coverage: 55 },
      { name: "Samagra Shiksha", category: "education", budget: 480, coverage: 65 },
      { name: "Ayushman Bharat", category: "health", budget: 320, coverage: 45 },
    ],
  },
  {
    id: "tripura", name: "Tripura", lat: 23.9408, lng: 91.9882,
    population: 41, cleanlinessScore: 48, literacyRate: 87.75, healthIndex: 55,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 35, coverage: 50 },
      { name: "Samagra Shiksha", category: "education", budget: 55, coverage: 72 },
    ],
  },
  {
    id: "up", name: "Uttar Pradesh", lat: 26.8467, lng: 80.9462,
    population: 2350, cleanlinessScore: 38, literacyRate: 73.0, healthIndex: 42,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 2200, coverage: 42 },
      { name: "Samagra Shiksha", category: "education", budget: 3500, coverage: 58 },
      { name: "Ayushman Bharat", category: "health", budget: 1800, coverage: 35 },
      { name: "PM Awas Yojana", category: "housing", budget: 2800, coverage: 30 },
      { name: "MGNREGA", category: "rural", budget: 4200, coverage: 55 },
    ],
  },
  {
    id: "uttarakhand", name: "Uttarakhand", lat: 30.0668, lng: 79.0193,
    population: 115, cleanlinessScore: 60, literacyRate: 79.63, healthIndex: 62,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 95, coverage: 58 },
      { name: "Samagra Shiksha", category: "education", budget: 150, coverage: 68 },
    ],
  },
  {
    id: "wb", name: "West Bengal", lat: 22.9868, lng: 87.855,
    population: 1010, cleanlinessScore: 35, literacyRate: 77.1, healthIndex: 50,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 800, coverage: 40 },
      { name: "Samagra Shiksha", category: "education", budget: 1100, coverage: 62 },
      { name: "Ayushman Bharat", category: "health", budget: 650, coverage: 32 },
      { name: "MGNREGA", category: "rural", budget: 2200, coverage: 58 },
    ],
  },
  {
    id: "delhi", name: "Delhi", lat: 28.6139, lng: 77.209,
    population: 200, cleanlinessScore: 62, literacyRate: 88.7, healthIndex: 72,
    schemes: [
      { name: "Swachh Bharat", category: "cleanliness", budget: 180, coverage: 68 },
      { name: "Ayushman Bharat", category: "health", budget: 320, coverage: 45 },
      { name: "PM Awas Yojana", category: "housing", budget: 250, coverage: 38 },
    ],
  },
];

export const REGION_GROUPS: RegionGroup[] = [
  {
    id: "north", name: "North India",
    description: "High population, developing indices",
    states: ["up", "bihar", "rajasthan", "delhi", "haryana", "hp", "uttarakhand", "punjab"],
  },
  {
    id: "south", name: "South India",
    description: "Higher literacy and health indices",
    states: ["kerala", "tamilnadu", "karnataka", "andhra", "telangana"],
  },
  {
    id: "west", name: "West India",
    description: "Mixed development indicators",
    states: ["maharashtra", "gujarat", "goa", "rajasthan"],
  },
  {
    id: "east", name: "East India",
    description: "Focus on rural development",
    states: ["wb", "bihar", "odisha", "jharkhand"],
  },
  {
    id: "northeast", name: "Northeast India",
    description: "High literacy, developing infrastructure",
    states: ["assam", "arunachal", "manipur", "meghalaya", "mizoram", "nagaland", "sikkim", "tripura"],
  },
  {
    id: "central", name: "Central India",
    description: "Large states with rural focus",
    states: ["mp", "chhattisgarh"],
  },
];

export function generateLocationScenario(
  selectedStateIds: string[],
  category: "cleanliness" | "education" | "health" | "overall"
) {
  const COLORS = [
    "hsl(172, 50%, 28%)", "hsl(42, 90%, 55%)", "hsl(12, 80%, 60%)",
    "hsl(230, 60%, 55%)", "hsl(160, 50%, 35%)", "hsl(290, 50%, 50%)",
  ];

  const states = selectedStateIds
    .map((id) => INDIAN_STATES.find((s) => s.id === id))
    .filter(Boolean) as StateData[];

  if (states.length < 2) return null;

  function getStateValue(state: StateData): number {
    switch (category) {
      case "cleanliness": return state.cleanlinessScore * state.population * 0.1;
      case "education": return state.literacyRate * state.population * 0.1;
      case "health": return state.healthIndex * state.population * 0.1;
      case "overall":
        return (state.cleanlinessScore * 0.3 + state.literacyRate * 0.35 + state.healthIndex * 0.35) * state.population * 0.1;
    }
  }

  function getCoalitionSynergy(coalition: StateData[]): number {
    const baseSum = coalition.reduce((sum, s) => sum + getStateValue(s), 0);
    const diversityBonus = coalition.length > 1 ? 1 + (coalition.length - 1) * 0.15 : 1;
    const cleanlinessSpread =
      category === "cleanliness" || category === "overall"
        ? Math.max(...coalition.map((s) => s.cleanlinessScore)) - Math.min(...coalition.map((s) => s.cleanlinessScore))
        : 0;
    const knowledgeTransfer = 1 + cleanlinessSpread * 0.003;
    return Math.round(baseSum * diversityBonus * knowledgeTransfer);
  }

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
    description: `Fair distribution across ${states.length} states for ${categoryLabels[category]} programme.`,
    icon: category === "cleanliness" ? "C" : category === "education" ? "E" : category === "health" ? "H" : "A",
    totalResource: totalValue,
    resourceUnit: "₹",
    players: states.map((s, i) => ({ id: s.id, name: s.name, color: COLORS[i % COLORS.length] })),
    coalitionValues: allCoalitions.map((coalition) => ({
      coalition: coalition.map((s) => s.id),
      value: getCoalitionSynergy(coalition),
    })),
  };
}

export function getCategoryIcon(cat: string) {
  switch (cat) {
    case "cleanliness": return "C";
    case "education": return "E";
    case "health": return "H";
    case "rural": return "R";
    case "housing": return "Ho";
    default: return "—";
  }
}
