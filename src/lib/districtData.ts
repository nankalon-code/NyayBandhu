// District-level data for all Indian states
// Each district has: name, population (lakhs), cleanlinessScore, literacyRate, healthIndex, schoolCount

export interface DistrictData {
  id: string;
  name: string;
  population: number; // in lakhs
  cleanlinessScore: number; // 0-100
  literacyRate: number; // percentage
  healthIndex: number; // 0-100
  schoolCount: number;
}

export interface StateDistrictMap {
  [stateId: string]: DistrictData[];
}

// Helper to generate a seeded pseudo-random number for consistency
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateDistricts(
  stateId: string,
  districts: { name: string; pop: number }[],
  baseClean: number,
  baseLit: number,
  baseHealth: number,
  seed: number
): DistrictData[] {
  const rng = seededRandom(seed);
  return districts.map((d) => {
    const variance = () => (rng() - 0.5) * 20;
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
    const clean = clamp(Math.round(baseClean + variance()), 10, 95);
    const lit = clamp(+(baseLit + variance() * 0.8).toFixed(1), 30, 99);
    const health = clamp(Math.round(baseHealth + variance()), 10, 95);
    const schools = Math.round(d.pop * (3 + rng() * 4));
    return {
      id: `${stateId}-${d.name.toLowerCase().replace(/\s+/g, "-")}`,
      name: d.name,
      population: d.pop,
      cleanlinessScore: clean,
      literacyRate: lit,
      healthIndex: health,
      schoolCount: schools,
    };
  });
}

export const STATE_DISTRICTS: StateDistrictMap = {
  rajasthan: generateDistricts("rajasthan", [
    { name: "Jaipur", pop: 66 },
    { name: "Jodhpur", pop: 37 },
    { name: "Udaipur", pop: 31 },
    { name: "Kota", pop: 20 },
    { name: "Bikaner", pop: 24 },
    { name: "Ajmer", pop: 26 },
    { name: "Alwar", pop: 37 },
    { name: "Bharatpur", pop: 25 },
    { name: "Sikar", pop: 27 },
    { name: "Jaisalmer", pop: 7 },
    { name: "Pali", pop: 21 },
    { name: "Nagaur", pop: 33 },
  ], 42, 69.7, 48, 101),

  maharashtra: generateDistricts("maharashtra", [
    { name: "Mumbai", pop: 124 },
    { name: "Pune", pop: 94 },
    { name: "Nagpur", pop: 46 },
    { name: "Nashik", pop: 61 },
    { name: "Thane", pop: 110 },
    { name: "Aurangabad", pop: 37 },
    { name: "Solapur", pop: 43 },
    { name: "Kolhapur", pop: 39 },
    { name: "Satara", pop: 30 },
    { name: "Ratnagiri", pop: 16 },
  ], 58, 84.8, 65, 201),

  up: generateDistricts("up", [
    { name: "Lucknow", pop: 45 },
    { name: "Kanpur", pop: 45 },
    { name: "Varanasi", pop: 37 },
    { name: "Agra", pop: 44 },
    { name: "Prayagraj", pop: 60 },
    { name: "Meerut", pop: 34 },
    { name: "Gorakhpur", pop: 44 },
    { name: "Bareilly", pop: 44 },
    { name: "Moradabad", pop: 47 },
    { name: "Aligarh", pop: 37 },
    { name: "Jhansi", pop: 18 },
    { name: "Mathura", pop: 25 },
  ], 38, 73.0, 42, 301),

  bihar: generateDistricts("bihar", [
    { name: "Patna", pop: 58 },
    { name: "Gaya", pop: 44 },
    { name: "Muzaffarpur", pop: 48 },
    { name: "Bhagalpur", pop: 30 },
    { name: "Purnia", pop: 33 },
    { name: "Darbhanga", pop: 39 },
    { name: "Begusarai", pop: 30 },
    { name: "Samastipur", pop: 42 },
    { name: "Vaishali", pop: 35 },
    { name: "Nalanda", pop: 29 },
  ], 28, 70.9, 35, 401),

  tamilnadu: generateDistricts("tamilnadu", [
    { name: "Chennai", pop: 46 },
    { name: "Coimbatore", pop: 35 },
    { name: "Madurai", pop: 30 },
    { name: "Tiruchirappalli", pop: 27 },
    { name: "Salem", pop: 35 },
    { name: "Tirunelveli", pop: 31 },
    { name: "Erode", pop: 22 },
    { name: "Vellore", pop: 39 },
    { name: "Thanjavur", pop: 24 },
    { name: "Kancheepuram", pop: 39 },
  ], 65, 82.9, 70, 501),

  karnataka: generateDistricts("karnataka", [
    { name: "Bengaluru", pop: 96 },
    { name: "Mysuru", pop: 30 },
    { name: "Hubli-Dharwad", pop: 18 },
    { name: "Mangaluru", pop: 21 },
    { name: "Belagavi", pop: 48 },
    { name: "Kalaburagi", pop: 26 },
    { name: "Davangere", pop: 19 },
    { name: "Ballari", pop: 26 },
    { name: "Tumkur", pop: 27 },
    { name: "Shimoga", pop: 18 },
  ], 60, 77.2, 62, 601),

  kerala: generateDistricts("kerala", [
    { name: "Thiruvananthapuram", pop: 33 },
    { name: "Kochi", pop: 33 },
    { name: "Kozhikode", pop: 31 },
    { name: "Thrissur", pop: 31 },
    { name: "Kollam", pop: 26 },
    { name: "Kannur", pop: 25 },
    { name: "Malappuram", pop: 41 },
    { name: "Palakkad", pop: 28 },
  ], 78, 96.2, 85, 701),

  gujarat: generateDistricts("gujarat", [
    { name: "Ahmedabad", pop: 72 },
    { name: "Surat", pop: 60 },
    { name: "Vadodara", pop: 42 },
    { name: "Rajkot", pop: 38 },
    { name: "Bhavnagar", pop: 29 },
    { name: "Jamnagar", pop: 21 },
    { name: "Junagadh", pop: 27 },
    { name: "Kutch", pop: 21 },
    { name: "Anand", pop: 21 },
    { name: "Mehsana", pop: 20 },
  ], 68, 79.3, 65, 801),

  mp: generateDistricts("mp", [
    { name: "Bhopal", pop: 23 },
    { name: "Indore", pop: 33 },
    { name: "Jabalpur", pop: 24 },
    { name: "Gwalior", pop: 21 },
    { name: "Ujjain", pop: 19 },
    { name: "Sagar", pop: 23 },
    { name: "Satna", pop: 23 },
    { name: "Rewa", pop: 24 },
    { name: "Chhindwara", pop: 21 },
    { name: "Betul", pop: 16 },
  ], 55, 73.7, 45, 901),

  wb: generateDistricts("wb", [
    { name: "Kolkata", pop: 44 },
    { name: "Howrah", pop: 49 },
    { name: "North 24 Parganas", pop: 100 },
    { name: "South 24 Parganas", pop: 82 },
    { name: "Bardhaman", pop: 77 },
    { name: "Murshidabad", pop: 71 },
    { name: "Nadia", pop: 52 },
    { name: "Midnapore", pop: 60 },
  ], 35, 77.1, 50, 1001),

  andhra: generateDistricts("andhra", [
    { name: "Visakhapatnam", pop: 42 },
    { name: "Vijayawada", pop: 35 },
    { name: "Guntur", pop: 49 },
    { name: "Tirupati", pop: 33 },
    { name: "Nellore", pop: 30 },
    { name: "Kurnool", pop: 40 },
    { name: "Kakinada", pop: 28 },
    { name: "Anantapur", pop: 41 },
  ], 52, 67.4, 55, 1101),

  telangana: generateDistricts("telangana", [
    { name: "Hyderabad", pop: 69 },
    { name: "Warangal", pop: 36 },
    { name: "Karimnagar", pop: 38 },
    { name: "Nizamabad", pop: 25 },
    { name: "Khammam", pop: 28 },
    { name: "Medak", pop: 27 },
    { name: "Nalgonda", pop: 35 },
    { name: "Rangareddy", pop: 52 },
  ], 58, 72.8, 58, 1201),

  punjab: generateDistricts("punjab", [
    { name: "Ludhiana", pop: 35 },
    { name: "Amritsar", pop: 25 },
    { name: "Jalandhar", pop: 22 },
    { name: "Patiala", pop: 19 },
    { name: "Bathinda", pop: 14 },
    { name: "Mohali", pop: 10 },
    { name: "Pathankot", pop: 6 },
    { name: "Hoshiarpur", pop: 16 },
  ], 58, 76.7, 62, 1301),

  haryana: generateDistricts("haryana", [
    { name: "Gurugram", pop: 15 },
    { name: "Faridabad", pop: 18 },
    { name: "Karnal", pop: 15 },
    { name: "Ambala", pop: 11 },
    { name: "Hisar", pop: 18 },
    { name: "Rohtak", pop: 11 },
    { name: "Panipat", pop: 12 },
    { name: "Sonipat", pop: 15 },
  ], 55, 76.6, 58, 1401),

  odisha: generateDistricts("odisha", [
    { name: "Bhubaneswar", pop: 28 },
    { name: "Cuttack", pop: 26 },
    { name: "Ganjam", pop: 35 },
    { name: "Balasore", pop: 24 },
    { name: "Mayurbhanj", pop: 26 },
    { name: "Sambalpur", pop: 10 },
    { name: "Koraput", pop: 14 },
    { name: "Sundargarh", pop: 21 },
  ], 38, 73.5, 42, 1501),

  jharkhand: generateDistricts("jharkhand", [
    { name: "Ranchi", pop: 29 },
    { name: "Jamshedpur", pop: 23 },
    { name: "Dhanbad", pop: 27 },
    { name: "Bokaro", pop: 21 },
    { name: "Hazaribagh", pop: 18 },
    { name: "Giridih", pop: 25 },
    { name: "Deoghar", pop: 15 },
    { name: "Dumka", pop: 13 },
  ], 32, 67.6, 38, 1601),

  chhattisgarh: generateDistricts("chhattisgarh", [
    { name: "Raipur", pop: 41 },
    { name: "Bilaspur", pop: 26 },
    { name: "Durg", pop: 33 },
    { name: "Korba", pop: 12 },
    { name: "Rajnandgaon", pop: 15 },
    { name: "Jagdalpur", pop: 14 },
    { name: "Raigarh", pop: 14 },
    { name: "Ambikapur", pop: 8 },
  ], 40, 71.0, 44, 1701),

  assam: generateDistricts("assam", [
    { name: "Guwahati", pop: 32 },
    { name: "Dibrugarh", pop: 13 },
    { name: "Jorhat", pop: 11 },
    { name: "Silchar", pop: 18 },
    { name: "Nagaon", pop: 28 },
    { name: "Tezpur", pop: 17 },
    { name: "Tinsukia", pop: 13 },
    { name: "Barpeta", pop: 17 },
  ], 35, 73.2, 42, 1801),

  uttarakhand: generateDistricts("uttarakhand", [
    { name: "Dehradun", pop: 17 },
    { name: "Haridwar", pop: 19 },
    { name: "Nainital", pop: 10 },
    { name: "Udham Singh Nagar", pop: 16 },
    { name: "Almora", pop: 6 },
    { name: "Pauri Garhwal", pop: 7 },
  ], 60, 79.6, 62, 1901),

  hp: generateDistricts("hp", [
    { name: "Shimla", pop: 8 },
    { name: "Kangra", pop: 15 },
    { name: "Mandi", pop: 10 },
    { name: "Solan", pop: 6 },
    { name: "Hamirpur", pop: 5 },
    { name: "Una", pop: 5 },
  ], 65, 83.8, 72, 2001),

  delhi: generateDistricts("delhi", [
    { name: "New Delhi", pop: 14 },
    { name: "South Delhi", pop: 28 },
    { name: "North Delhi", pop: 9 },
    { name: "East Delhi", pop: 17 },
    { name: "West Delhi", pop: 25 },
    { name: "Central Delhi", pop: 6 },
    { name: "North East Delhi", pop: 22 },
    { name: "South West Delhi", pop: 23 },
    { name: "North West Delhi", pop: 36 },
    { name: "Shahdara", pop: 14 },
    { name: "South East Delhi", pop: 14 },
  ], 62, 88.7, 72, 2101),

  goa: generateDistricts("goa", [
    { name: "North Goa", pop: 8 },
    { name: "South Goa", pop: 6 },
  ], 72, 88.7, 78, 2201),

  // Smaller NE states
  arunachal: generateDistricts("arunachal", [
    { name: "Itanagar", pop: 3 },
    { name: "Tawang", pop: 1 },
    { name: "Pasighat", pop: 2 },
    { name: "Ziro", pop: 1 },
  ], 45, 67.0, 40, 2301),

  manipur: generateDistricts("manipur", [
    { name: "Imphal East", pop: 5 },
    { name: "Imphal West", pop: 5 },
    { name: "Bishnupur", pop: 2 },
    { name: "Thoubal", pop: 4 },
    { name: "Churachandpur", pop: 3 },
  ], 38, 79.9, 45, 2401),

  meghalaya: generateDistricts("meghalaya", [
    { name: "Shillong", pop: 6 },
    { name: "Tura", pop: 5 },
    { name: "Jowai", pop: 4 },
    { name: "Nongpoh", pop: 3 },
  ], 42, 75.5, 48, 2501),

  mizoram: generateDistricts("mizoram", [
    { name: "Aizawl", pop: 4 },
    { name: "Lunglei", pop: 2 },
    { name: "Champhai", pop: 1 },
  ], 70, 91.6, 68, 2601),

  nagaland: generateDistricts("nagaland", [
    { name: "Kohima", pop: 3 },
    { name: "Dimapur", pop: 5 },
    { name: "Mokokchung", pop: 2 },
    { name: "Tuensang", pop: 2 },
  ], 44, 80.1, 50, 2701),

  sikkim: generateDistricts("sikkim", [
    { name: "Gangtok", pop: 3 },
    { name: "Namchi", pop: 1 },
    { name: "Mangan", pop: 1 },
  ], 68, 82.2, 70, 2801),

  tripura: generateDistricts("tripura", [
    { name: "Agartala", pop: 10 },
    { name: "Udaipur", pop: 5 },
    { name: "Dharmanagar", pop: 4 },
    { name: "Kailashahar", pop: 4 },
  ], 48, 87.8, 55, 2901),
};

/**
 * Distribute a budget across districts using a need-based formula.
 * Need = inverse of score × population weight.
 * Lower score = more need = more allocation.
 */
export function distributeToDistricts(
  stateId: string,
  totalBudget: number,
  category: "cleanliness" | "education" | "health" | "overall"
): { district: DistrictData; allocation: number; needScore: number; percentage: number }[] | null {
  const districts = STATE_DISTRICTS[stateId];
  if (!districts) return null;

  // Calculate need score: higher need = lower metric score × higher population
  const withNeed = districts.map((d) => {
    let metricScore: number;
    switch (category) {
      case "cleanliness":
        metricScore = d.cleanlinessScore;
        break;
      case "education":
        metricScore = d.literacyRate;
        break;
      case "health":
        metricScore = d.healthIndex;
        break;
      case "overall":
        metricScore = d.cleanlinessScore * 0.3 + d.literacyRate * 0.35 + d.healthIndex * 0.35;
        break;
    }
    // Need is inverse: areas with worse scores need more money
    const needScore = ((100 - metricScore) / 100) * d.population;
    return { district: d, needScore };
  });

  const totalNeed = withNeed.reduce((sum, w) => sum + w.needScore, 0);

  return withNeed
    .map((w) => {
      const percentage = totalNeed > 0 ? (w.needScore / totalNeed) * 100 : 100 / districts.length;
      return {
        district: w.district,
        allocation: Math.round((percentage / 100) * totalBudget),
        needScore: +w.needScore.toFixed(2),
        percentage: +percentage.toFixed(1),
      };
    })
    .sort((a, b) => b.allocation - a.allocation);
}
