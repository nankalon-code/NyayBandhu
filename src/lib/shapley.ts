// Shapley Value Calculator for Fair Resource Allocation
// Based on cooperative game theory by Lloyd Shapley (Nobel Prize 2012)

export interface Player {
  id: string;
  name: string;
  color: string;
}

export interface CoalitionValue {
  coalition: string[]; // player IDs
  value: number;
}

export interface ShapleyResult {
  playerId: string;
  playerName: string;
  shapleyValue: number;
  percentage: number;
  color: string;
  marginalContributions: { coalition: string[]; marginal: number }[];
}

// Calculate factorial
function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

// Generate all subsets of an array
function getSubsets<T>(arr: T[]): T[][] {
  const subsets: T[][] = [[]];
  for (const item of arr) {
    const len = subsets.length;
    for (let i = 0; i < len; i++) {
      subsets.push([...subsets[i], item]);
    }
  }
  return subsets;
}

// Get the value of a coalition from the characteristic function
function getCoalitionValue(
  coalition: string[],
  characteristicFunction: Map<string, number>
): number {
  const key = [...coalition].sort().join(",");
  return characteristicFunction.get(key) || 0;
}

// Calculate Shapley Values for all players
export function calculateShapleyValues(
  players: Player[],
  coalitionValues: CoalitionValue[]
): ShapleyResult[] {
  const n = players.length;
  const playerIds = players.map((p) => p.id);

  // Build characteristic function map
  const charFunc = new Map<string, number>();
  for (const cv of coalitionValues) {
    const key = [...cv.coalition].sort().join(",");
    charFunc.set(key, cv.value);
  }

  const results: ShapleyResult[] = [];

  for (const player of players) {
    let shapleyValue = 0;
    const marginalContributions: { coalition: string[]; marginal: number }[] = [];

    // Get all subsets NOT containing the current player
    const othersIds = playerIds.filter((id) => id !== player.id);
    const subsets = getSubsets(othersIds);

    for (const subset of subsets) {
      const s = subset.length;

      // Weight: |S|!(n-|S|-1)! / n!
      const weight = (factorial(s) * factorial(n - s - 1)) / factorial(n);

      // Marginal contribution: v(S ∪ {i}) - v(S)
      const coalitionWithPlayer = [...subset, player.id];
      const vWithPlayer = getCoalitionValue(coalitionWithPlayer, charFunc);
      const vWithout = getCoalitionValue(subset, charFunc);
      const marginal = vWithPlayer - vWithout;

      shapleyValue += weight * marginal;

      marginalContributions.push({
        coalition: subset,
        marginal: marginal,
      });
    }

    results.push({
      playerId: player.id,
      playerName: player.name,
      shapleyValue,
      percentage: 0, // calculated below
      color: player.color,
      marginalContributions,
    });
  }

  // Calculate percentages
  const total = results.reduce((sum, r) => sum + r.shapleyValue, 0);
  if (total > 0) {
    for (const r of results) {
      r.percentage = (r.shapleyValue / total) * 100;
    }
  }

  return results;
}

// Preset scenarios
export interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: string;
  totalResource: number;
  resourceUnit: string;
  players: Player[];
  coalitionValues: CoalitionValue[];
}

const COLORS = [
  "hsl(172, 50%, 28%)",
  "hsl(42, 90%, 55%)",
  "hsl(12, 80%, 60%)",
  "hsl(230, 60%, 55%)",
  "hsl(160, 50%, 35%)",
  "hsl(290, 50%, 50%)",
];

export const SCENARIOS: Scenario[] = [
  {
    id: "swachh-bharat",
    name: "Swachh Bharat Cleanliness Fund",
    description:
      "Fairly distribute ₹30 Crore among 4 states for Swachh Bharat Mission based on cleanliness impact and collaborative improvement.",
    icon: "🧹",
    totalResource: 30_00_00_000,
    resourceUnit: "₹",
    players: [
      { id: "up", name: "Uttar Pradesh", color: COLORS[0] },
      { id: "bihar", name: "Bihar", color: COLORS[1] },
      { id: "mp", name: "Madhya Pradesh", color: COLORS[2] },
      { id: "rajasthan", name: "Rajasthan", color: COLORS[3] },
    ],
    coalitionValues: [
      { coalition: ["up"], value: 6_00_00_000 },
      { coalition: ["bihar"], value: 4_00_00_000 },
      { coalition: ["mp"], value: 5_50_00_000 },
      { coalition: ["rajasthan"], value: 4_50_00_000 },
      { coalition: ["up", "bihar"], value: 12_00_00_000 },
      { coalition: ["up", "mp"], value: 13_50_00_000 },
      { coalition: ["up", "rajasthan"], value: 12_50_00_000 },
      { coalition: ["bihar", "mp"], value: 11_00_00_000 },
      { coalition: ["bihar", "rajasthan"], value: 10_00_00_000 },
      { coalition: ["mp", "rajasthan"], value: 11_50_00_000 },
      { coalition: ["up", "bihar", "mp"], value: 21_00_00_000 },
      { coalition: ["up", "bihar", "rajasthan"], value: 19_50_00_000 },
      { coalition: ["up", "mp", "rajasthan"], value: 22_00_00_000 },
      { coalition: ["bihar", "mp", "rajasthan"], value: 18_00_00_000 },
      { coalition: ["up", "bihar", "mp", "rajasthan"], value: 30_00_00_000 },
    ],
  },
  {
    id: "state-budget",
    name: "State Education Budget",
    description:
      "Fairly distribute ₹50 Crore among 3 Indian states for Samagra Shiksha Abhiyan based on collaborative impact on literacy rates.",
    icon: "🏫",
    totalResource: 50_00_00_000,
    resourceUnit: "₹",
    players: [
      { id: "up", name: "Uttar Pradesh", color: COLORS[0] },
      { id: "bihar", name: "Bihar", color: COLORS[1] },
      { id: "rajasthan", name: "Rajasthan", color: COLORS[2] },
    ],
    coalitionValues: [
      { coalition: ["up"], value: 15_00_00_000 },
      { coalition: ["bihar"], value: 12_00_00_000 },
      { coalition: ["rajasthan"], value: 8_00_00_000 },
      { coalition: ["up", "bihar"], value: 32_00_00_000 },
      { coalition: ["up", "rajasthan"], value: 28_00_00_000 },
      { coalition: ["bihar", "rajasthan"], value: 22_00_00_000 },
      { coalition: ["up", "bihar", "rajasthan"], value: 50_00_00_000 },
    ],
  },
  {
    id: "disaster-relief",
    name: "Kerala Flood Relief",
    description:
      "Allocate 500 tonnes of relief supplies among 4 agencies during monsoon flooding in Kerala.",
    icon: "🌊",
    totalResource: 500,
    resourceUnit: "tonnes",
    players: [
      { id: "ndrf", name: "NDRF", color: COLORS[0] },
      { id: "army", name: "Indian Army", color: COLORS[1] },
      { id: "ngo", name: "NGO Coalition", color: COLORS[2] },
      { id: "local", name: "Panchayat Network", color: COLORS[3] },
    ],
    coalitionValues: [
      { coalition: ["ndrf"], value: 80 },
      { coalition: ["army"], value: 70 },
      { coalition: ["ngo"], value: 100 },
      { coalition: ["local"], value: 40 },
      { coalition: ["ndrf", "army"], value: 190 },
      { coalition: ["ndrf", "ngo"], value: 220 },
      { coalition: ["ndrf", "local"], value: 150 },
      { coalition: ["army", "ngo"], value: 200 },
      { coalition: ["army", "local"], value: 140 },
      { coalition: ["ngo", "local"], value: 190 },
      { coalition: ["ndrf", "army", "ngo"], value: 360 },
      { coalition: ["ndrf", "army", "local"], value: 300 },
      { coalition: ["ndrf", "ngo", "local"], value: 370 },
      { coalition: ["army", "ngo", "local"], value: 330 },
      { coalition: ["ndrf", "army", "ngo", "local"], value: 500 },
    ],
  },
  {
    id: "hospital-beds",
    name: "AIIMS Bed Allocation",
    description:
      "Distribute 200 beds across 3 departments at AIIMS Delhi based on collaborative patient outcomes.",
    icon: "🏥",
    totalResource: 200,
    resourceUnit: "beds",
    players: [
      { id: "er", name: "Emergency (Casualty)", color: COLORS[0] },
      { id: "icu", name: "ICU", color: COLORS[1] },
      { id: "general", name: "General Ward", color: COLORS[2] },
    ],
    coalitionValues: [
      { coalition: ["er"], value: 70 },
      { coalition: ["icu"], value: 50 },
      { coalition: ["general"], value: 40 },
      { coalition: ["er", "icu"], value: 140 },
      { coalition: ["er", "general"], value: 130 },
      { coalition: ["icu", "general"], value: 100 },
      { coalition: ["er", "icu", "general"], value: 200 },
    ],
  },
];

export function formatValue(value: number, unit: string): string {
  if (unit === "₹") {
    if (value >= 1_00_00_000) {
      return `₹${(value / 1_00_00_000).toFixed(1)} Cr`;
    }
    if (value >= 1_00_000) {
      return `₹${(value / 1_00_000).toFixed(1)} L`;
    }
    return `₹${value.toLocaleString("en-IN")}`;
  }
  return `${Math.round(value).toLocaleString("en-IN")} ${unit}`;
}

// Fairness comparison methods
export interface FairnessComparison {
  method: string;
  description: string;
  allocations: { playerId: string; playerName: string; value: number; percentage: number; color: string }[];
}

export function calculateFairnessComparisons(
  players: Player[],
  coalitionValues: CoalitionValue[],
  shapleyResults: ShapleyResult[],
  totalResource: number
): FairnessComparison[] {
  const n = players.length;

  // 1. Equal Split
  const equalValue = totalResource / n;
  const equalAllocations = players.map((p) => ({
    playerId: p.id,
    playerName: p.name,
    value: equalValue,
    percentage: 100 / n,
    color: p.color,
  }));

  // 2. Proportional (based on standalone value)
  const standaloneValues = players.map((p) => {
    const cv = coalitionValues.find(
      (c) => c.coalition.length === 1 && c.coalition[0] === p.id
    );
    return cv?.value || 0;
  });
  const standaloneTotal = standaloneValues.reduce((a, b) => a + b, 0);
  const proportionalAllocations = players.map((p, i) => ({
    playerId: p.id,
    playerName: p.name,
    value: standaloneTotal > 0 ? (standaloneValues[i] / standaloneTotal) * totalResource : 0,
    percentage: standaloneTotal > 0 ? (standaloneValues[i] / standaloneTotal) * 100 : 0,
    color: p.color,
  }));

  // 3. Shapley (already computed)
  const shapleyAllocations = shapleyResults.map((r) => ({
    playerId: r.playerId,
    playerName: r.playerName,
    value: r.shapleyValue,
    percentage: r.percentage,
    color: r.color,
  }));

  return [
    {
      method: "Equal Split",
      description: "Everyone gets the same amount regardless of contribution",
      allocations: equalAllocations,
    },
    {
      method: "Proportional",
      description: "Based on what each player achieves alone (ignores synergies)",
      allocations: proportionalAllocations,
    },
    {
      method: "Shapley Value",
      description: "Accounts for every possible coalition and marginal contribution",
      allocations: shapleyAllocations,
    },
  ];
}
