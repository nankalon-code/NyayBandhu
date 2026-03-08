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
    id: "school-funding",
    name: "School District Funding",
    description:
      "Fairly distribute $10M among 3 school districts based on their collaborative impact on student outcomes.",
    icon: "🏫",
    totalResource: 10_000_000,
    resourceUnit: "$",
    players: [
      { id: "urban", name: "Urban District", color: COLORS[0] },
      { id: "suburban", name: "Suburban District", color: COLORS[1] },
      { id: "rural", name: "Rural District", color: COLORS[2] },
    ],
    coalitionValues: [
      { coalition: ["urban"], value: 3_000_000 },
      { coalition: ["suburban"], value: 2_500_000 },
      { coalition: ["rural"], value: 1_500_000 },
      { coalition: ["urban", "suburban"], value: 6_500_000 },
      { coalition: ["urban", "rural"], value: 5_500_000 },
      { coalition: ["suburban", "rural"], value: 4_500_000 },
      { coalition: ["urban", "suburban", "rural"], value: 10_000_000 },
    ],
  },
  {
    id: "disaster-relief",
    name: "Disaster Relief",
    description:
      "Allocate 500 tons of supplies among 4 relief agencies based on their joint effectiveness.",
    icon: "🆘",
    totalResource: 500,
    resourceUnit: "tons",
    players: [
      { id: "medical", name: "Medical Corps", color: COLORS[0] },
      { id: "shelter", name: "Shelter Agency", color: COLORS[1] },
      { id: "food", name: "Food Network", color: COLORS[2] },
      { id: "logistics", name: "Logistics Team", color: COLORS[3] },
    ],
    coalitionValues: [
      { coalition: ["medical"], value: 80 },
      { coalition: ["shelter"], value: 60 },
      { coalition: ["food"], value: 100 },
      { coalition: ["logistics"], value: 40 },
      { coalition: ["medical", "shelter"], value: 180 },
      { coalition: ["medical", "food"], value: 220 },
      { coalition: ["medical", "logistics"], value: 160 },
      { coalition: ["shelter", "food"], value: 190 },
      { coalition: ["shelter", "logistics"], value: 140 },
      { coalition: ["food", "logistics"], value: 200 },
      { coalition: ["medical", "shelter", "food"], value: 350 },
      { coalition: ["medical", "shelter", "logistics"], value: 300 },
      { coalition: ["medical", "food", "logistics"], value: 370 },
      { coalition: ["shelter", "food", "logistics"], value: 320 },
      { coalition: ["medical", "shelter", "food", "logistics"], value: 500 },
    ],
  },
  {
    id: "healthcare",
    name: "Hospital Bed Allocation",
    description:
      "Distribute 200 hospital beds across 3 departments based on collaborative patient outcomes.",
    icon: "🏥",
    totalResource: 200,
    resourceUnit: "beds",
    players: [
      { id: "er", name: "Emergency Room", color: COLORS[0] },
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
  if (unit === "$") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }
  return `${Math.round(value).toLocaleString()} ${unit}`;
}
